using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Clients;
using Infrastructure.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Infrastructure.Services
{
    public class BTCService : BackgroundService
    {
        #region Fields

        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IHubContext<NotificationHub> _hubContext;

        #endregion

        #region Constructor

        public BTCService(IServiceScopeFactory scopeFactory,
            IHubContext<NotificationHub> hubContext)
        {
            _scopeFactory = scopeFactory;
            _hubContext = hubContext;
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
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", "Tabloda değişiklik oldu.");
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
