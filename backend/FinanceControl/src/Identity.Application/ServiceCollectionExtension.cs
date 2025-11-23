using Identity.Application.Interfaces.Service;
using Identity.Application.Services;
using Microsoft.Extensions.DependencyInjection;
using Security;

namespace Identity.Application;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddSecurity();
        
        services.AddTransient<IUserService, UserService>();
        
        return services;
    } 
}