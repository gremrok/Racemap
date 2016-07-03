using System;
using System.Linq;
using System.Web.Mvc;

namespace IdentitySample.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            using (var p = new PolarPersonalTrainerApi.PersonalTrainerApi())
            {
                p.Login("t-a-w@ya.ru", "123kolobok");
                var acts = p.GetActivities(DateTime.Now.AddDays(-7), DateTime.Now).ToList();
                return View(acts);
            }
            //return View(acts);
        }

        [Authorize]
        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
