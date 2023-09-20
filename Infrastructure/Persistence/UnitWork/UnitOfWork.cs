using Application.Interfaces;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Persistence.Context;
using Persistence.Repositories;
using Persistence.Services;

namespace Persistence.UnitWork
{
    public class UnitOfWork : IUnitOfWork
    {
        #region Fields

        private readonly MyDatabase _db;
        private readonly IHttpContextAccessor _httpContextAccessor;

        #endregion

        #region Constructor

        public UnitOfWork(MyDatabase db,
            IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
        }

        #endregion

        #region Methods

        public IBitcoinRepository BitcoinRepository => new BitcoinRepository(_db);
        public IUserRepository UserRepository => new UserRepository(_db, _httpContextAccessor);
        public IEncryptionService EncryptionService => new EncryptionService();

        public async Task<bool> Complete()
        {
            return await _db.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            _db.ChangeTracker.DetectChanges();
            var changes = _db.ChangeTracker.HasChanges();

            return changes;
        }

        #endregion
    }
}
