using Application.Interfaces.Repositories;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Persistence.Context;

namespace Persistence.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : BaseEntity
    {
        #region Fields

        private readonly MyDatabase _db;

        #endregion

        #region Constructor

        public BaseRepository(MyDatabase db)
        {
            _db = db;
        }

        #endregion

        #region Methods

        #region Table

        public DbSet<T> Table => _db.Set<T>();

        #endregion

        #region InsertAsync

        /// Insert entity
        /// <param name="model">Entity</param>
        public async Task<bool> InsertAsync(T model)
        {
            EntityEntry<T> entityEntry = await Table.AddAsync(model);
            return entityEntry.State == EntityState.Added;
        }

        #endregion

        #region UpdateAsync

        /// Update entity
        /// <param name="model">Entity</param>
        public async Task<bool> UpdateAsync(T model)
        {
            model.Status = DataStatus.Updated;
            model.ModifiedDate = DateTime.UtcNow;
            T toBeUpdated = await GetByIdAsync(model.Id);
            _db.Entry(toBeUpdated).CurrentValues.SetValues(model);
            return true;
        }

        #endregion

        #region GetByIdAsync

        /// Get entity by identifier
        /// <param name="id">Identifier</param>
        public async Task<T> GetByIdAsync(int id, bool tracking = true)
        {
            IQueryable<T> query = Table.AsQueryable();
            if (!tracking)
                query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync(x => x.Id == id);
        }

        #endregion

        #endregion
    }
}
