using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        [HttpPost]
        public ActionResult Index(List<Race> races)
        {
            StringBuilder sb = new StringBuilder();
            
            foreach (var race in races)
            {
                sb.AppendFormat("insert into races(id, name, description, date, place, type, category, categoryFull, url, tags, lng, lat) values({0},'{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}',{10},{11});", race.Id, race.Name, race.Description, race.Date, race.Place, race.Type, race.Category, race.CategoryFull, race.Url, race.Tags, race.Lng, race.Lat);    
            }
            using (StreamWriter outfile = new StreamWriter(@"C:\Users\terehin\YandexDisk\ahotu\ahotu.sql", true))
            {
                outfile.Write(sb.ToString());
            }
            return View();
        }
    }
}
