using Business.Abstract;
using Business.Concrete;
using Core.Utilities.Logging;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        //Loosely Coupled
        IContactsService _contactsService;
        

        public ContactsController(IContactsService contactsService)
        {
            _contactsService = contactsService;
        }
        [HttpGet("getall")]
        public IActionResult GetAll() 
        {
            MyLogger.GetInstance().Info("Entering the get all contacts. GetAll Method");
            Thread.Sleep(1000);
           
            var result = _contactsService.GetAll();
            if (result.Success)
            {

                MyLogger.GetInstance().Info("Finishing the get all contacts. GetAll Method");
                return Ok(result);
            }

            MyLogger.GetInstance().Error("Error occured on getting all contacts. GetAll Method");

            return BadRequest(result);

           
        }

        [HttpGet("getfavourites")]
        public IActionResult GetFavourites()
        {
            MyLogger.GetInstance().Info("Entering the get favourites. GetFavourites Method");
            Thread.Sleep(1000);

            var result = _contactsService.GetFavourites();
            if (result.Success)
            {
                MyLogger.GetInstance().Info("Finishing the get favourites. GetFavourites Method");
                return Ok(result);
            }

            MyLogger.GetInstance().Error("Error occured on getting favourites. GetFavourites Method");
            return BadRequest(result);

        }

        [HttpGet("gethiddens")]
        public IActionResult GetHiddens()
        {
            MyLogger.GetInstance().Info("Entering the get favourites. GetHiddens Method");
            Thread.Sleep(1000);

            var result = _contactsService.GetHiddens();
            if (result.Success)
            {
                MyLogger.GetInstance().Info("Finishing the get hiddens. GetHiddens Method");
                return Ok(result);
            }

            MyLogger.GetInstance().Error("Error occured on getting hiddens. GetHiddens Method");
            return BadRequest(result);

        }

        [HttpGet("getblockeds")]
        public IActionResult GetBlockeds()
        {
            MyLogger.GetInstance().Info("Entering the get blockeds. GetBlockeds Method");
            Thread.Sleep(1000);

            var result = _contactsService.GetBlockeds();
            if (result.Success)
            {
                MyLogger.GetInstance().Info("Finishing the get blockeds. GetBlockeds Method");
                return Ok(result);
            }

            MyLogger.GetInstance().Error("Error occured on getting blockeds. GetBlockeds Method");
            return BadRequest(result);

        }

        [HttpGet("getbyid")]
        public IActionResult GetById(int id)
        {
            MyLogger.GetInstance().Info("Entering the get by Id. GetById Method");

            var result = _contactsService.GetById(id);
            if (result.Success)
            {
                MyLogger.GetInstance().Info("Finishing the get by Id. GetById Method");
                return Ok(result);
            }

            MyLogger.GetInstance().Error("Error occured on getting by Id. GetById Method");
            return BadRequest(result);

        }

        [HttpPost("add")]
        public IActionResult Add(Contacts contact)
        {
            MyLogger.GetInstance().Info("Entering the add function. Add Method");
            var result = _contactsService.Add(contact);

            if (result.Success)
            {
                MyLogger.GetInstance().Info("Finishing the add function. Add Method");
                return Ok(result);
            }
            MyLogger.GetInstance().Error("Error occured on adding. Add Method");
            return BadRequest(result);
        }

        [HttpPost("update")]
        public IActionResult Update(Contacts contact)
        {
            MyLogger.GetInstance().Info("Entering the update function. Update Method");

            var result = _contactsService.Update(contact);
            if (result.Success)
            {
                MyLogger.GetInstance().Info("Finishing the update function. Update Method");
                return Ok(result);
            }
            MyLogger.GetInstance().Error("Error occured on updating. Update Method");
            return BadRequest(result);
        }

        [HttpPost("delete")]
        public IActionResult Delete(Contacts contact)
        {
            MyLogger.GetInstance().Info("Entering the delete function. Delete Method");

            var result = _contactsService.Delete(contact);
            if (result.Success)
            {
                MyLogger.GetInstance().Info("Finishing the delete function. Delete Method");
                return Ok(result);
            }

            MyLogger.GetInstance().Error("Error occured on deleting. Delete Method");
            return BadRequest(result);
        }
    }
}
