using Application.Interfaces.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence.Context;
using System.Security.Claims;

namespace Persistence.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        #region Fields

        private readonly IHttpContextAccessor _httpContextAccessor;

        #endregion

        #region Constructor

        public UserRepository(MyDatabase db,
            IHttpContextAccessor httpContextAccessor) : base(db)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        #endregion

        #region Methods

        #region GetCurrentUserAsync

        /// Get current user
        public async Task<User> GetCurrentUserAsync()
        {
            string? email = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            IQueryable<User> query = from c in Table
                                     where c.Email == email
                                     select c;
            return  await query.FirstOrDefaultAsync();
        }

        #endregion

        #region GetUserByEmailAsync

        /// Get user by email
        /// <param name="email">Email</param>
        public async Task<User> GetUserByEmailAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return null;

            IQueryable<User> query = from c in Table
                                     where c.Email == email
                                     select c;
            return await query.FirstOrDefaultAsync();
        }

        #endregion

        #region GetUserDetailAsync

        /// Get user detail
        /// <param name="id"></param>
        public async Task<User> GetUserDetailAsync(int id)
        {
            IQueryable<User> query = from c in Table
                                     where c.Id == id
                                     select c;

            return await query.FirstOrDefaultAsync();
        }

        #endregion

        #endregion
    }
}
