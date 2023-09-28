using Infrastructure.Models;
using Newtonsoft.Json;

namespace Infrastructure.Clients
{
    public class BitcoinClient
    {
        public async Task<Root> GetBitcoinLatestPriceAsync()
        {
            using HttpClient client = new();
            client.DefaultRequestHeaders.Add("X-CMC_PRO_API_KEY", "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c");
            HttpResponseMessage result = await client.GetAsync("https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC");
            Root obj = JsonConvert.DeserializeObject<Root>(await result.Content.ReadAsStringAsync());
            return obj;
        }
    }
}
