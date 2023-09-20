using Application.Interfaces.Repositories;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Context;

namespace Persistence.Repositories
{
    public class BitcoinRepository : BaseRepository<Bitcoin>, IBitcoinRepository
    {
        #region Constructor

        public BitcoinRepository(MyDatabase db) : base(db)
        {
        }

        #endregion

        #region Methods

        #region GetBitcoinListByDateRange

        /// Get bitcoin list by date range
        /// <param name="start"></param>
        /// <param name="end"></param>
        public async Task<List<Bitcoin>> GetBitcoinListByDateRangeAsync(DateTime? start, DateTime? end)
        {
            var query = from c in Table
                        where (!start.HasValue || c.QueryDate >= start)
                        && (!end.HasValue || c.QueryDate <= end)
                        select c;
            return await query.ToListAsync();
        }

        #endregion

        #endregion
    }
}
