using Microsoft.Extensions.DependencyInjection;

namespace Identity.Business;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddBusiness(this IServiceCollection services)
    {
        return services;
    }
}