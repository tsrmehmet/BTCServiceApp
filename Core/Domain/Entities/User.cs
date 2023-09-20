namespace Domain.Entities
{
    public class User : BaseEntity
    {
        #region Properties

        /// Gets or sets the email
        public string Email { get; set; }

        /// Gets or sets the first name
        public string FirstName { get; set; }

        /// Gets or sets the last name
        public string LastName { get; set; }

        /// Gets or sets the password
        public string Password { get; set; }

        /// Gets or sets the password salt
        public string PasswordSalt { get; set; }

        #endregion
    }
}
