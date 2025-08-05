using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Identity.Data;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddData(this IServiceCollection services, IConfigurationManager configuration)
    {
        services.AddDbContext<IdentityDbContext>(op =>
        {
            var connString = configuration.GetConnectionString("Default");
            op.UseNpgsql(connString);
        });
        
        return services;
    }
}