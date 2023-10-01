using FluentValidation;
using UI.Models;

namespace UI.Validators
{
    public class UserDetailModelValidation : AbstractValidator<UserDetailModel>
    {
        #region Constructor

        public UserDetailModelValidation()
        {
            RuleFor(x => x.Email)
                .NotNull().NotEmpty().WithMessage("{PropertyName} alanı zorunludur.")
                .EmailAddress().WithMessage("Lütfen geçerli bir {PropertyName} adresi giriniz.")
                .WithName("E-Posta");

            RuleFor(x => x.FirstName)
                .NotNull().NotEmpty().WithMessage("{PropertyName} alanı zorunludur.")
                .WithName("Ad");

            RuleFor(x => x.LastName)
                .NotNull().NotEmpty().WithMessage("{PropertyName} alanı zorunludur.")
                .WithName("Soyad");
        }

        #endregion
    }
}
