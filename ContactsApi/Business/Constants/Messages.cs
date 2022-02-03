using Core.Entities.Concrete;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Business.Constants
{
    public static class Messages
    {
        public static string ContactAdded = "Contact is added succesfully!";
        public static string ContactUpdated = "Contact is updated succesfully!";
        public static string ContactDeleted = "Contact is deleted succesfully!";
        public static string ContactBlankName = "Name cannot be blank!";
        public static string ContactInvalidNumber = "Please enter 11 digits phone number";
        public static string ContactsMaxCount = "Maximum capacity reached!";
        public static string NumberAlreadyExists = "The number is already exist!";
        internal static string ContactsListed = "Contacts are listed succesfully!";   
        internal static string MaintenanceTime = "It is maintenance time! Please try again later.";
        public static string AuthorizationDenied = "You are not authorized!";
        public static string UserRegistered = "Registered Successfully!";
        public static string UserNotFound = "User Not Found!";
        public static string PasswordError = "Password Error!";
        public static string SuccessfulLogin= "Login Successfully!";
        public static string AccessTokenCreated = "Access Token is created!";
        public static string UserAlreadyExists = "User is already exists!";
    }
}
