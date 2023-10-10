using Application.Interfaces;
using Application.Models;
using AutoMapper;
using BitcoinApi.Controllers;
using Domain.Entities;
using Domain.Enums;
using Moq;

namespace BitcoinApi.Test
{
    public class ApiUserControllerTest
    {
        #region Fields

        private readonly Mock<IUnitOfWork> _moqUnitOfWork;
        private readonly UserController _userController;
        private readonly IMapper _mapper;
        private User user;
        private UserModel userModel;
        private User nullUser;

        #endregion

        #region Constructor

        public ApiUserControllerTest()
        {
            _moqUnitOfWork = new Mock<IUnitOfWork>();
            _userController = new UserController(_moqUnitOfWork.Object, _mapper!);
            user = new() { Id = 3, Email = "mahmut.yaman@hotmail.com", FirstName = "Mahmut", LastName = "Yaman", Password = "123456", PasswordSalt = "AsdDsa", CreatedDate = DateTime.UtcNow, Status = DataStatus.Inserted };
            userModel = new() { Id = 3, Email = "mahmut.yaman@hotmail.com", FirstName = "Mahmut", LastName = "Yaman", Password = "123456", PasswordSalt = "AsdDsa", CreatedDate = DateTime.UtcNow, Status = DataStatus.Inserted };
        }

        #endregion

        #region Methods

        #region Login_UserIsNull_ReturnFalseAsync

        [Fact]
        public async Task Login_UserIsNull_ReturnFalseAsync()
        {
            _moqUnitOfWork.Setup(x => x.UserRepository.GetUserByEmailAsync(userModel.Email)).ReturnsAsync(nullUser);
            var result = await _userController.Login(userModel);
            Assert.False(result);
        }

        #endregion

        #region Login_PasswordIsNull_ReturnFalseAsync

        [Fact]
        public async Task Login_PasswordIsNull_ReturnFalseAsync()
        {
            _moqUnitOfWork.Setup(x => x.UserRepository.GetUserByEmailAsync(userModel.Email)).ReturnsAsync(user);
            userModel.Password = null;
            var result = await _userController.Login(userModel);
            Assert.False(result);
        }

        #endregion
            
        #region Login_ActionExecute_ReturnTrueAsync

        [Fact]
        public async Task Login_ActionExecute_ReturnTrueAsync()
        {
            _moqUnitOfWork.Setup(x => x.UserRepository.GetUserByEmailAsync(userModel.Email)).ReturnsAsync(user);
            _moqUnitOfWork.Setup(x => x.EncryptionService.CreatePasswordHash(user.Password, user.PasswordSalt,"SHA512")).Returns(user.Password);
            var result = await _userController.Login(userModel);
            Assert.True(result);
        }

        #endregion

        #region Detail_ActionExecutes_ReturnUserModelAsync

        [Fact]
        public async Task Detail_ActionExecutes_ReturnUserModelAsync()
        {
            _moqUnitOfWork.Setup(x => x.UserRepository.GetCurrentUserAsync()).ReturnsAsync(user);
            var result = await _userController.Detail();
            Assert.Equal(user.Id, result.Id);
        }

        #endregion

        #region Update_IdIsZero_ReturnFalseAsync

        [Fact]
        public async Task Update_IdIsZero_ReturnFalseAsync()
        {
            _moqUnitOfWork.Setup(x => x.UserRepository.GetByIdAsync(user.Id, true)).ReturnsAsync(user);
            UserModel userModel = new() { Id = 0 };
            var result = await _userController.Update(userModel);
            Assert.False(result);
        }

        #endregion

        #region Update_IdIsNotZero_ReturnTrueAsync

        [Fact]
        public async Task Update_IdIsNotZero_ReturnTrueAsync()
        {
            _moqUnitOfWork.Setup(x => x.UserRepository.GetByIdAsync(user.Id, true)).ReturnsAsync(user);
            UserModel userModel = new() { Id = user.Id };
            var result = await _userController.Update(userModel);
            Assert.True(result);
        }

        #endregion

        #endregion
    }
}
