using Business.Abstract;
using Business.BusinessAspect.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Validation;
using Core.CrossCuttingConcerns.Validation;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.Concrete
{
    public class ContactsManager : IContactsService
    {
        IContactsDal _contactsDal;

        public ContactsManager(IContactsDal contactsDal)
        {
            _contactsDal = contactsDal;
        } 

        [CacheAspect]//Key Value Payer
        public IDataResult<List<Contacts>> GetAll()
        {
            //Business Codes


            /*Example for Maintanenance Time
            if (DateTime.Now.Hour == 22)
            {
                return new ErrorDataResult<List<Contacts>>(Messages.MaintenanceTime);
            }
            */

            return new SuccessDataResult<List<Contacts>>(_contactsDal.GetAll(c => c.HIDE == false),Messages.ContactsListed);
            
        }

        public IDataResult<List<Contacts>> GetFavourites()
        {

            return new SuccessDataResult<List<Contacts>>(_contactsDal.GetAll(c => c.FAVOURITE == true ), Messages.ContactsListed);

        }

        public IDataResult<List<Contacts>> GetHiddens()
        {

            return new SuccessDataResult<List<Contacts>>(_contactsDal.GetAll(c => c.HIDE == true), Messages.ContactsListed);

        }

        public IDataResult<List<Contacts>> GetBlockeds()
        {

            return new SuccessDataResult<List<Contacts>>(_contactsDal.GetAll(c => c.BLOCK == true), Messages.ContactsListed);

        }

        [CacheAspect]
        public IDataResult<Contacts> GetById(int id)
        {
            return new SuccessDataResult<Contacts>(_contactsDal.Get(c => c.ID == id));
        }

        public IDataResult<List<ContactsDetailDto>> GetContactsDetails()
        {
            return new SuccessDataResult<List<ContactsDetailDto>>(_contactsDal.GetContactsDetails());
        }

        //[SecuredOperation("admin,contacts.add")]
        [ValidationAspect(typeof(ContactsValidator))]
        [CacheRemoveAspect("IContactsService.Get")]
        public IResult Add(Contacts contact)
        {

            // ValidationTool.Validate(new ContactsValidator(), contact);

            //Business Codes

            IResult result = BusinessRules.Run(CheckIfMaxCountOfContacts(contact.ID), 
                CheckIfNumberExists(contact.PHONE_NUMBER));

            if (result != null)
            {
                return result;
            }

            _contactsDal.Add(contact);

            return new SuccessResult(Messages.ContactAdded);
           

            //if (contact.FIRST_NAME.Length < 1)
            //{
            //    return new ErrorResult(Messages.ContactBlankName);
            //}

            //else if (contact.PHONE_NUMBER.Length < 11)
            //{
            //    return new ErrorResult(Messages.ContactInvalidNumber);
            //}

           
        }

        //[SecuredOperation("admin")]
        [ValidationAspect(typeof(ContactsValidator))]
        [CacheRemoveAspect("IContactsService.Get")]
        public IResult Update(Contacts contact)
        {
            //ValidationTool.Validate(new ContactsValidator(), contact);

            //IResult result = BusinessRules.Run(CheckIfMaxCountOfContacts(contact.ID),
            //    CheckIfNumberExists(contact.PHONE_NUMBER));

            IResult result = null;

            if (result != null)
            {
                return result;
            }

            _contactsDal.Update(contact);

            return new SuccessResult(Messages.ContactUpdated);


            //if (contact.FIRST_NAME.Length < 1)
            //{
            //    return new ErrorResult(Messages.ContactBlankName);
            //}

            //else if (contact.PHONE_NUMBER.Length < 11)
            //{
            //    return new ErrorResult(Messages.ContactInvalidNumber);
            //}


        }

        [CacheRemoveAspect("IContactsService.Get")]
        public IResult Delete(Contacts contact)
        {   
            _contactsDal.Delete(contact);
            return new SuccessResult(Messages.ContactDeleted);
        }

        private IResult CheckIfMaxCountOfContacts(int id) {

            //Maximum 200 contacts
            //Select count(*) from contacts where ID == id;
            var result = _contactsDal.GetAll(p => p.ID == id).Count;

            if (result >= 200)
            {
                return new ErrorResult(Messages.ContactsMaxCount);
            }

            return new SuccessResult();
        }

        private IResult CheckIfNumberExists(string number)
        {

            //A number cannot belong to more than one person

            var result = _contactsDal.GetAll(p => p.PHONE_NUMBER == number).Any();

            if (result)
            {
                return new ErrorResult(Messages.NumberAlreadyExists);
            }

            return new SuccessResult();
        }

        public IResult AddTransactionalTest(Contacts contact)
        {
            throw new NotImplementedException();
        }
    }
}
