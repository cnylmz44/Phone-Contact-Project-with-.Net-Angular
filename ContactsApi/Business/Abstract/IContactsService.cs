using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IContactsService
    {
        IDataResult<List<Contacts>> GetAll();
        IDataResult<List<Contacts>> GetFavourites();
        IDataResult<List<Contacts>> GetHiddens();
        IDataResult<List<Contacts>> GetBlockeds();
        IDataResult<List<ContactsDetailDto>> GetContactsDetails();
        IDataResult<Contacts> GetById(int id);
        IResult Add(Contacts contact);
        IResult Update(Contacts contact);
        IResult Delete(Contacts contact);
        IResult AddTransactionalTest(Contacts contact);
    }
}
