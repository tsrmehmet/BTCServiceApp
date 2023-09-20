using Application.Interfaces;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Persistence.Repositories;
using Persistence.Services;
using Persistence.UnitWork;

namespace Persistence.ServiceExtensions
{
    public static class RepoServiceExtension
    {
        #region Methods

        #region AddRepManServices

        /// Add repository services
        /// <param name="services"></param>
        public static IServiceCollection AddRepoServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IBitcoinRepository, BitcoinRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEncryptionService, EncryptionService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();

            return services;
        }

        #endregion

        #endregion
    }
}
