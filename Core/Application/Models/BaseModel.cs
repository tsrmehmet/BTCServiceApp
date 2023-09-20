using Domain.Enums;

namespace Application.Models
{
    public class BaseModel
    {
        #region Properties

        public int Id { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DataStatus? Status { get; set; }

        #endregion
    }
}
