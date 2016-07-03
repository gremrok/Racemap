using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using App;

namespace App.Controllers
{
    public class RacesController : Controller
    {
        private RacemapDbContext db = new RacemapDbContext();

        // GET: Races
        public async Task<ActionResult> Index()
        {
            return View(await db.Races.ToListAsync());
        }

        // GET: Races/Details/5
        public async Task<ActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Races races = await db.Races.FindAsync(id);
            if (races == null)
            {
                return HttpNotFound();
            }
            return View(races);
        }

        // GET: Races/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Races/Create
        // Чтобы защититься от атак чрезмерной передачи данных, включите определенные свойства, для которых следует установить привязку. Дополнительные 
        // сведения см. в статье http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Name,Description,Date,Place,Type,Category,CategoryFull,Url,Tags,Lng,Lat,Id,RaceId,TypeId")] Races races)
        {
            if (ModelState.IsValid)
            {
                races.Id = Guid.NewGuid();
                db.Races.Add(races);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(races);
        }

        // GET: Races/Edit/5
        public async Task<ActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Races races = await db.Races.FindAsync(id);
            if (races == null)
            {
                return HttpNotFound();
            }
            return View(races);
        }

        // POST: Races/Edit/5
        // Чтобы защититься от атак чрезмерной передачи данных, включите определенные свойства, для которых следует установить привязку. Дополнительные 
        // сведения см. в статье http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Name,Description,Date,Place,Type,Category,CategoryFull,Url,Tags,Lng,Lat,Id,RaceId,TypeId")] Races races)
        {
            if (ModelState.IsValid)
            {
                db.Entry(races).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(races);
        }

        // GET: Races/Delete/5
        public async Task<ActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Races races = await db.Races.FindAsync(id);
            if (races == null)
            {
                return HttpNotFound();
            }
            return View(races);
        }

        // POST: Races/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid id)
        {
            Races races = await db.Races.FindAsync(id);
            db.Races.Remove(races);
            await db.SaveChangesAsync();
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
