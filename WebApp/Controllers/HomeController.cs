using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        [HttpPost]
        public async Task<ActionResult> Index(List<Race> races)
        {
            StringBuilder sb = new StringBuilder();
            if (races == null)
            {
                return View();
            }
            foreach (var race in races)
            {
                sb.AppendLine(
                    string.Format(
                        "insert into races(id, name, description, date, place, type, category, categoryFull, url, tags, lng, lat) values({0},'{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}');",
                        race.Id, 
                        race.Name.Replace("'", "''"), 
                        !string.IsNullOrEmpty(race.Description) ? race.Description.Replace("'", "''") : string.Empty, 
                        race.Date,
                        !string.IsNullOrEmpty(race.Place) ? race.Place.Replace("'", "''") : string.Empty, 
                        !string.IsNullOrEmpty(race.Type) ? race.Type.Replace("'", "''") : string.Empty, 
                        !string.IsNullOrEmpty(race.Category) ? race.Category.Replace("'", "''") : string.Empty, 
                        !string.IsNullOrEmpty(race.CategoryFull) ? race.CategoryFull.Replace("'", "''") : string.Empty, 
                        !string.IsNullOrEmpty(race.Url) ? race.Url.Replace("'", "''") : string.Empty,
                        !string.IsNullOrEmpty(race.Tags) ? race.Tags.Replace("'", "''") : string.Empty, 
                        race.Lng.Replace(",", "."), 
                        race.Lat.Replace(",", ".")));
                
            }
            var content = sb.ToString();
            using (StreamWriter outfile = new StreamWriter(string.Format(@"C:\Users\terehin\YandexDisk\ahotu\ahotu-{0}.sql", races[0].Category), true))
            {
                await outfile.WriteAsync(content);
            }
            return View();
        }
    }
}
