namespace UI.Models
{
    public class UserDetailModel : BaseModel
    {
        #region Properties

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }

        #endregion
    }
}
