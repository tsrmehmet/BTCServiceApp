using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BitcoinApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;

        private readonly IUnitOfWork _unitOfWork;

        public AuthController(TokenService tokenService, IUnitOfWork unitOfWork)
        {
            _tokenService = tokenService;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] User userParam)
        {
            User user = _unitOfWork.UserRepository.GetUserByEmailAsync(userParam.Email).Result;
            if (user is null)
                return BadRequest(new { message = "Kullanıcı bulunamadı!" });
            string savedPassword = _unitOfWork.EncryptionService.CreatePasswordHash(userParam.Password, user?.PasswordSalt);
            if (!user.Password.Equals(savedPassword))
                return BadRequest(new { message = "Kullanıcı adı veya şifre hatalı" });
          
            // JWT token oluşturma
            var token = _tokenService.GenerateAccessToken(new List<Claim>
        {
            new Claim(ClaimTypes.Email, userParam.Email)
        });

            return Ok(new { token });
        }
    }
}
