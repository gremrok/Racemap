using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace WebApp.Controllers
{
    public class RaceApiController : ApiController
    {
        private racemapEntities db = new racemapEntities();

        // GET api/race
        [Route("/api/raceapi")]
        public IEnumerable<Race> GetRaces()
        {
            return db.Races.AsEnumerable();
        }

        // GET api/race/5
        public Race GetRace(Guid id)
        {
            Race race = db.Races.Find(id);
            if (race == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return race;
        }

        // PUT api/race/5
        public HttpResponseMessage PutRace(Guid id, Race race)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != race.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(race).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/race
        public HttpResponseMessage PostRace(Race race)
        {
            if (ModelState.IsValid)
            {
                db.Races.Add(race);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, race);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = race.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/race/5
        public HttpResponseMessage DeleteRace(Guid id)
        {
            Race race = db.Races.Find(id);
            if (race == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Races.Remove(race);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, race);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}