using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Clients;
using Infrastructure.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Infrastructure.Services
{
    public class BTCService : BackgroundService
    {
        #region Fields

        private readonly IServiceScopeFactory _scopeFactory;

        #endregion

        #region Constructor

        public BTCService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        #endregion

        public async Task BTCCallEngine()
        {
            BitcoinClient client = new();
            DateTime queryDate = DateTime.Now;
            Root response = await client.GetBitcoinLatestPriceAsync();
            Bitcoin bitcoin = new()
            {
                USD = response?.data?.BTC?.quote?.USD?.price,
                Source = "CoinMarktCap",
                QueryDate = queryDate
            };

            using IServiceScope scope = _scopeFactory.CreateScope();
            IUnitOfWork unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
            await unitOfWork.BitcoinRepository.InsertAsync(bitcoin);
            await unitOfWork.Complete();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await BTCCallEngine();
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}
