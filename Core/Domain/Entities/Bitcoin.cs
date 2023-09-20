namespace Domain.Entities
{
    public class Bitcoin : BaseEntity
    {
        public double? USD { get; set; }
        public string Source { get; set; }
        public DateTime? QueryDate { get; set; }
    }
}
