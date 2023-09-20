using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Context;

namespace Persistence.ServiceExtensions
{
    public static class DbContextService
    {
        #region Methods

        #region AddDbContextService

        /// Add database context service
        /// <param name="services"></param>
        public static IServiceCollection AddDbContextService(this IServiceCollection services)
        {
            ServiceProvider provider = services.BuildServiceProvider();
            IConfiguration? configuration = provider.GetService<IConfiguration>();
            services.AddDbContext<MyDatabase>(options => options.UseNpgsql(configuration?.GetConnectionString("PostgreSQL")));

            return services;
        }

        #endregion

        #endregion
    }
}
