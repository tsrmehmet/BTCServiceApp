using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Interfaces.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        #region Methods

        DbSet<T> Table { get; }

        /// Insert entity
        /// <param name="model">Entity</param>
        Task<bool> InsertAsync(T model);

        /// Update entity
        /// <param name="model">Entity</param>
        Task<bool> UpdateAsync(T model);

        /// Get entity by identifier
        /// <param name="id">Identifier</param>
        Task<T> GetByIdAsync(int id, bool tracking = true);

        #endregion
    }
}
