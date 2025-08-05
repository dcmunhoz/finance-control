using System.Runtime.CompilerServices;
using Identity.Business;
using Identity.Data;

namespace Identity.Api;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddDependencies(this  IServiceCollection services, IConfigurationManager configuration)
    {
        services.AddApi()
                .AddBusiness()
                .AddData(configuration);
        
        return services;
    }

    private static IServiceCollection AddApi(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddOpenApi();

        return services;
    }
    
}