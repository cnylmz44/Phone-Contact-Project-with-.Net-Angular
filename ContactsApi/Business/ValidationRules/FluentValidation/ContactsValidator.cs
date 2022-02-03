using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class ContactsValidator : AbstractValidator<Contacts>
    {
        public ContactsValidator()
        {
            //RuleFor(p => p.FIRST_NAME).NotEmpty();
            //RuleFor(p => p.PHONE_NUMBER).MinimumLength(11);
        }
    }
}
