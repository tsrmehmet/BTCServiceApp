using FluentValidation;
using UI.Models;

namespace UI.Validators
{
    public class UserCreateModelValidation : AbstractValidator<UserCreateModel>
    {
        #region Constructor

        public UserCreateModelValidation()
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

            RuleFor(x => x.Password)
                .NotNull().NotEmpty().WithMessage("{PropertyName} alanı zorunludur.")
                .MinimumLength(6).WithMessage("{PropertyName} en az 6 karakter olmalıdır.")
                .MaximumLength(16).WithMessage("{PropertyName} en fazla 16 karakter olmalıdır.")
                .WithName("Şifre");
        }

        #endregion
    }
}
