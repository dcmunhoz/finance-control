using Identity.Application.Interfaces.Repository;
using Identity.Infra.Data;
using Identity.Infra.Data.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection;

public static class ServicesCollectionExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<IdentityContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("Identity"));
        });
        
        services.AddTransient<IUserRepository, UserRepository>();
        
        return services;
    }
    
}