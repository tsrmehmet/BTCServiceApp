using System.Net;

namespace UI.Models
{
    public class BitcoinModel : BaseModel
    {
        public double? USD { get; set; }
        public string Source { get; set; }
        public DateTime? QueryDate { get; set; }
    }

    public class BitcoinModelResponse { 
        public  List<double?> PriceValues { get; set; }

        public List<string> LabelValues { get; set; }

        public HttpStatusCode StatusCode { get; set; }
    }
}
