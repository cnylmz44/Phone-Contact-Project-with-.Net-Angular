using Core;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class ContactsDetailDto:IDto
    {
        public int ID { get; set; }
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string PHONE_NUMBER { get; set; }
        public string MAIL { get; set; }
        public string TITLE { get; set; }
        public string COMPANY { get; set; }
        public string NOTES { get; set; }
        public DateTime REGISTER_DATE { get; set; }
        public bool FAVOURITE { get; set; }
        public bool HIDE { get; set; }
        public bool BLOCK { get; set; }
    }
}
