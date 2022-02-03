using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfContactsDal : EfEntityRepositoryBase<Contacts, ContactsContext>, IContactsDal
    {
        public List<ContactsDetailDto> GetContactsDetails()
        {
            using (ContactsContext context = new ContactsContext())
            {
                var result = from p in context.Contacts
                             select new ContactsDetailDto 
                             { ID = p.ID, FIRST_NAME = p.FIRST_NAME,
                             LAST_NAME = p.LAST_NAME 
                             };

                return result.ToList();
            }
        }
    }
}
