namespace Application.Models
{
    public class BitcoinModel : BaseModel
    {
        public double? USD { get; set; }
        public string Source { get; set; }
        public DateTime? QueryDate { get; set; }
    }
}
