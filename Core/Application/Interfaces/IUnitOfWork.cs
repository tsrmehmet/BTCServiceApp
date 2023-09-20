using Application.Interfaces.Repositories;
using Application.Interfaces.Services;

namespace Application.Interfaces
{
    public interface IUnitOfWork
    {
        IBitcoinRepository BitcoinRepository { get; }
        IUserRepository UserRepository { get; }
        IEncryptionService EncryptionService { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}
