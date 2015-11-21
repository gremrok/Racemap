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
    public class RaceSerieController : Controller
    {
        private RacemapEntities db = new RacemapEntities();

        // GET: /RaceSerie/
        public ActionResult Index()
        {
            return View(db.RaceSerie.ToList());
        }

        // GET: /RaceSerie/Details/5
        public ActionResult Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RaceSerie raceserie = db.RaceSerie.Find(id);
            if (raceserie == null)
            {
                return HttpNotFound();
            }
            return View(raceserie);
        }

        // GET: /RaceSerie/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /RaceSerie/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Name")] RaceSerie raceserie)
        {
            if (ModelState.IsValid)
            {
                raceserie.Id = Guid.NewGuid();
                db.RaceSerie.Add(raceserie);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(raceserie);
        }

        // GET: /RaceSerie/Edit/5
        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RaceSerie raceserie = db.RaceSerie.Find(id);
            if (raceserie == null)
            {
                return HttpNotFound();
            }
            return View(raceserie);
        }

        // POST: /RaceSerie/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Name")] RaceSerie raceserie)
        {
            if (ModelState.IsValid)
            {
                db.Entry(raceserie).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(raceserie);
        }

        // GET: /RaceSerie/Delete/5
        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RaceSerie raceserie = db.RaceSerie.Find(id);
            if (raceserie == null)
            {
                return HttpNotFound();
            }
            return View(raceserie);
        }

        // POST: /RaceSerie/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            RaceSerie raceserie = db.RaceSerie.Find(id);
            db.RaceSerie.Remove(raceserie);
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
