using Application.Interfaces;
using Application.Models;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BitcoinApi.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region Fields

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        #endregion

        #region Constructor

        public UserController(IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        #endregion

        #region Methods

        #region Login

        [AllowAnonymous]
        [HttpPost]

        public async Task<bool> Login(UserModel model)
        {
            User user = await _unitOfWork.UserRepository.GetUserByEmailAsync(model.Email);
            if (user == null || string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(user?.Password))
                return false;

            string savedPassword = _unitOfWork.EncryptionService.CreatePasswordHash(model.Password, user.PasswordSalt);
            if (!user.Password.Equals(savedPassword))
                return false;
            return true;
        }

        #endregion

        #region Create

        [AllowAnonymous]
        [HttpPost]
        public async Task Create(UserModel model)
        {
            User user = _mapper.Map<User>(model);
            user.PasswordSalt = _unitOfWork.EncryptionService.CreateSaltKey();
            user.Password = _unitOfWork.EncryptionService.CreatePasswordHash(model.Password, user.PasswordSalt);
            await _unitOfWork.UserRepository.InsertAsync(user);
            await _unitOfWork.Complete();
        }

        #endregion

        #region Detail

        [HttpGet]
        public async Task<UserModel> Detail()
        {
            User user = await _unitOfWork.UserRepository.GetCurrentUserAsync();
            return _mapper.Map<UserModel>(user);
        }

        #endregion

        #region Update

        [HttpPost]
        public async Task<bool> Update(UserModel model)
        {
            if(model.Id == 0)
                return false;

            User user = await _unitOfWork.UserRepository.GetByIdAsync(model.Id);
            User userUpdated = _mapper.Map<User>(model);

            if (string.IsNullOrEmpty(model.Password))
            {
                userUpdated.Password = user.Password;
                userUpdated.PasswordSalt = user.PasswordSalt;
            }
            else
            {
                userUpdated.PasswordSalt = _unitOfWork.EncryptionService.CreateSaltKey();
                userUpdated.Password = _unitOfWork.EncryptionService.CreatePasswordHash(model.Password, userUpdated.PasswordSalt);
            }
            await _unitOfWork.UserRepository.UpdateAsync(userUpdated);
            await _unitOfWork.Complete();
            return true;
        }

        #endregion

        #endregion
    }
}
