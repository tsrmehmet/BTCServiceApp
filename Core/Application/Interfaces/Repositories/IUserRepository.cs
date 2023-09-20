using Domain.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        /// Get current user
        Task<User> GetCurrentUserAsync();

        /// Get user by email
        /// <param name="email">Email</param>
        Task<User> GetUserByEmailAsync(string email);

        /// Get user detail
        /// <param name="id"></param>
        Task<User> GetUserDetailAsync(int id);
    }
}
