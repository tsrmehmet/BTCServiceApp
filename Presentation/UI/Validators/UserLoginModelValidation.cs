using FluentValidation;
using UI.Models;

namespace UI.Validators
{
    public class UserLoginModelValidation : AbstractValidator<UserLoginModel>
    {
        #region Constructor

        public UserLoginModelValidation()
        {
            RuleFor(x => x.Email)
                .NotNull().NotEmpty().WithMessage("{PropertyName} alanı zorunludur.")
                .EmailAddress().WithMessage("Lütfen geçerli bir {PropertyName} adresi giriniz.")
                .WithName("E-Posta");

            RuleFor(x => x.Password)
                .NotNull().NotEmpty().WithMessage("{PropertyName} alanı zorunludur.")
                .WithName("Şifre");
        }

        #endregion
    }
}
