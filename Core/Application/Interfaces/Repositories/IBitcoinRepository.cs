using Domain.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IBitcoinRepository : IRepository<Bitcoin>
    {
        /// Get bitcoin list by date range
        /// <param name="start"></param>
        /// <param name="end"></param>
        Task<List<Bitcoin>> GetBitcoinListByDateRangeAsync(DateTime? start, DateTime? end);
    }
}
