using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using CRUDRepositoryMethod.Repository;
using CRUDRepositoryMethod.Entities;
using System.Drawing;
using System.IO;
using CRUDRepositoryMethod.EntityFramework;

namespace CRUDRepositoryMethod.Controllers

{
    public class IndexController : Controller
    {
        IUserDetails userDetails = new UserDetailsRepository();
        // GET: Index
        public ActionResult Index(int page = 1, int pageSize = 10)
        {
            var udetails = userDetails.GetUserDetails();
            PagedList<UserDetails> model = new PagedList<UserDetails>(udetails, page, pageSize);
            return View(model);
        }


        [HttpPost]
        public ActionResult InsertuS(UserDetails insert, string ProfilePic)
        {
            string base64 = ProfilePic.Substring(ProfilePic.IndexOf(',') + 1);

            byte[] chartData = Convert.FromBase64String(base64);

            Image image;
            using (var ms = new MemoryStream(chartData, 0, chartData.Length))
            {
                image = Image.FromStream(ms, true);

            }
            var randomFileName = Guid.NewGuid().ToString().Substring(0, 4) + ".png";
            var fullPath = Path.Combine(Server.MapPath("~/Images/"), randomFileName);
            image.Save(fullPath, System.Drawing.Imaging.ImageFormat.Png);
            insert.ProfilePic = randomFileName;
            if (ModelState.IsValid)
            {
                userDetails.GetInsertDetail(insert);
            }
            return RedirectToAction("Index");
        }

        public ActionResult Delete(int? id)
        {
            userDetails.GetDeleteDetail(id);

            return RedirectToAction("Index");
        }



        //public JsonResult Update(Users user)
        //{
        //    var data = Mul.User.FirstOrDefault(x => x.Id == user.Id);
        //    if (data != null)
        //    {
        //        data.Name = user.Name;
        //        data.State = user.State;
        //        data.Country = user.Country;
        //        data.Age = user.Age;
        //        MultiplesEntities.SaveChanges();
        //    }
        //    return Json(JsonRequestBehavior.AllowGet);
        //}



        public ActionResult Edit(int Id)
        {
           var user= userDetails.GetEditDetails(Id);
            //CarDetails = user.CarDetails
            return Json(new { UserId = user.UserId, FullName = user.FullName, UserEmail = user.UserEmail, CivilIdNumber = user.CivilIdNumber, CarDetails = user.CarDetails }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]

        public ActionResult EdituS(UserDetails insert)
        {

            userDetails.EditUserDetails(insert);
            return RedirectToAction("Index");
        }

    }
}


