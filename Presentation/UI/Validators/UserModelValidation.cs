using FluentValidation;
using UI.Models;

namespace UI.Validators
{
    public class UserModelValidation : AbstractValidator<UserModel>
    {
        #region Constructor

        public UserModelValidation()
        {
            RuleFor(x => x.Email)
                .NotNull().WithMessage("{PropertyName} alanı zorunludur.")
                .NotEmpty().WithMessage("{PropertyName} alanı zorunludur.");

            RuleFor(x => x.FirstName)
                .NotNull().WithMessage("{PropertyName} alanı zorunludur.")
                .NotEmpty().WithMessage("{PropertyName} alanı zorunludur.");

            RuleFor(x => x.LastName)
                .NotNull().WithMessage("{PropertyName} alanı zorunludur.")
                .NotEmpty().WithMessage("{PropertyName} alanı zorunludur.");

            RuleFor(x => x.Password)
                .NotNull().WithMessage("{PropertyName} alanı zorunludur.")
                .NotEmpty().WithMessage("{PropertyName} alanı zorunludur.")
                .MinimumLength(6).WithMessage("{PropertyName} en az 6 karakter olmalıdır.")
                .MaximumLength(16).WithMessage("{PropertyName} en fazla 16 karakter olmalıdır.");
        }

        #endregion
    }
}
