using Domain.Enums;

namespace Domain.Entities
{
    public class BaseEntity
    {
        #region Properties

        public int Id { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
        public DataStatus? Status { get; set; } = DataStatus.Inserted;

        #endregion
    }
}
