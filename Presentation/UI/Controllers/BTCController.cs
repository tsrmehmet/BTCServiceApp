using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UI.Models;

namespace UI.Controllers
{
    public class BTCController : Controller
    {
        public async Task<IActionResult> Info(int timeRageDay = 3)
        {
            var response = await CallApiForBitcoinPrice(timeRageDay);
            return View(response);
        }
        public async Task<BitcoinModelResponse> InfoForAjaxCall(int timeRageDay)
        {

            BitcoinModelResponse response = await CallApiForBitcoinPrice(timeRageDay);
            return response;
        }

        public async Task<BitcoinModelResponse> CallApiForBitcoinPrice(int timeRageDay) {
            DateTime? start = DateTime.Now.AddHours(-timeRageDay);
            DateTime? end = DateTime.Now;

            HttpClient client = new();
            HttpResponseMessage result = await client.GetAsync("https://bitcoinapi/api/btc/list?start=" + start.Value.ToString("yyyy.MM.dd HH:mm:ss") + "&end=" + end.Value.ToString("yyyy.MM.dd HH:mm:ss"));
            string response = await result.Content.ReadAsStringAsync();
            List<BitcoinModel> model = JsonConvert.DeserializeObject<List<BitcoinModel>>(response);
            BitcoinModelResponse responseModel = new();
            if (model != null)
            {
                responseModel.PriceValues = model.Select(x => x.USD).ToList();
                responseModel.LabelValues = model.Select(x => x.QueryDate.Value.ToString("yyyy.MM.dd HH:mm")).ToList();
            }
            return responseModel;
        }
    }
}
