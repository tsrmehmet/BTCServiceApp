namespace UI.Models
{
    public class UserModel : BaseModel
    {
        #region Properties

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }

        #endregion
    }
}
