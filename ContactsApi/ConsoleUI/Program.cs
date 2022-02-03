using Business.Concrete;
using DataAccess.Concrete.EntityFramework;
using System;

namespace ConsoleUI
{
    class Program
    {
        static void Main(string[] args)
        {
            
            ContactsManager contactsmanager = new ContactsManager(new EfContactsDal());
            var result = contactsmanager.GetContactsDetails();

            if (result.Success)
            {
                foreach (var contact in result.Data)
                {
                    Console.WriteLine(contact.ID);
                }
            }

            else
            {
                Console.WriteLine(result.Message);
            }
            
        }
    }
}
