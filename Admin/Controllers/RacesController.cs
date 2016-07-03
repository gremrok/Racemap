using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Admin;

namespace Admin.Controllers
{
    public class RacesController : ApiController
    {
        private RacemapEntities db = new RacemapEntities();

        // GET: api/Races
        public IQueryable<Race> GetRace()
        {
            return db.Races.Where(o=> o.Lat == null || o.Lng == null);
        }

        // GET: api/Races/5
        [ResponseType(typeof(Race))]
        public IHttpActionResult GetRace(int id)
        {
            Race race = db.Races.Find(id);
            if (race == null)
            {
                return NotFound();
            }

            return Ok(race);
        }

        // PUT: api/Races/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRace(Guid id, Race race)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != race.Id)
            {
                return BadRequest();
            }

            db.Entry(race).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RaceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Races
        [ResponseType(typeof(Race))]
        public IHttpActionResult PostRace(Race race)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Races.Add(race);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (RaceExists(race.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = race.Id }, race);
        }

        // DELETE: api/Races/5
        [ResponseType(typeof(Race))]
        public IHttpActionResult DeleteRace(int id)
        {
            Race race = db.Races.Find(id);
            if (race == null)
            {
                return NotFound();
            }

            db.Races.Remove(race);
            db.SaveChanges();

            return Ok(race);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RaceExists(Guid id)
        {
            return db.Races.Count(e => e.Id == id) > 0;
        }
    }
}