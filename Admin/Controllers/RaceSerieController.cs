using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Admin;

namespace Admin.Controllers
{
    [Authorize]
    public class RaceSeriaController : Controller
    {
        private RacemapEntities db = new RacemapEntities();

        // GET: /RaceSeria/
        public ActionResult Index()
        {
            return View(db.RaceSerias.ToList());
        }

        // GET: /RaceSeria/Details/5
        public ActionResult Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RaceSeria RaceSeria = db.RaceSerias.Find(id);
            if (RaceSeria == null)
            {
                return HttpNotFound();
            }
            return View(RaceSeria);
        }

        // GET: /RaceSeria/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /RaceSeria/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Name")] RaceSeria RaceSeria)
        {
            if (ModelState.IsValid)
            {
                RaceSeria.Id = Guid.NewGuid();
                db.RaceSerias.Add(RaceSeria);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(RaceSeria);
        }

        // GET: /RaceSeria/Edit/5
        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RaceSeria RaceSeria = db.RaceSerias.Find(id);
            if (RaceSeria == null)
            {
                return HttpNotFound();
            }
            return View(RaceSeria);
        }

        // POST: /RaceSeria/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Name")] RaceSeria RaceSeria)
        {
            if (ModelState.IsValid)
            {
                db.Entry(RaceSeria).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(RaceSeria);
        }

        // GET: /RaceSeria/Delete/5
        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RaceSeria RaceSeria = db.RaceSerias.Find(id);
            if (RaceSeria == null)
            {
                return HttpNotFound();
            }
            return View(RaceSeria);
        }

        // POST: /RaceSeria/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            RaceSeria RaceSeria = db.RaceSerias.Find(id);
            db.RaceSerias.Remove(RaceSeria);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
