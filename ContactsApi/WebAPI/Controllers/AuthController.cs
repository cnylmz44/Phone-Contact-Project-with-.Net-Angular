using Business.Abstract;
using Core.Utilities.Logging;
using Entities.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public ActionResult Login(UserForLoginDto userForLoginDto)
        {
            MyLogger.GetInstance().Info("Entering the login function. Login Method");
            var userToLogin = _authService.Login(userForLoginDto);
            if (!userToLogin.Success)
            {
                MyLogger.GetInstance().Error("Error in login function. Login Method");
                return BadRequest(userToLogin.Message);
            }

            var result = _authService.CreateAccessToken(userToLogin.Data);
            if (result.Success)
            {
                MyLogger.GetInstance().Info("Finishing the login function. Login Method");
                return Ok(result);
            }
            MyLogger.GetInstance().Error("Error in login function. Login Method");
            return BadRequest(result.Message);
        }

        [HttpPost("register")]
        public ActionResult Register(UserForRegisterDto userForRegisterDto)
        {
            MyLogger.GetInstance().Info("Entering the register function. Register Method");
            var userExists = _authService.UserExists(userForRegisterDto.Mail);
            if (!userExists.Success)
            {
                MyLogger.GetInstance().Error("Error in register function. Register Method");
                return BadRequest(userExists.Message);
            }

            var registerResult = _authService.Register(userForRegisterDto, userForRegisterDto.Password);
            var result = _authService.CreateAccessToken(registerResult.Data);
            if (result.Success)
            {
                MyLogger.GetInstance().Info("Finishing the register function. Register Method");
                return Ok(result.Data);
            }
            MyLogger.GetInstance().Error("Error in register function. Register Method");
            return BadRequest(result.Message);
        }
    }
}
