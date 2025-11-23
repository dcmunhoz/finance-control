using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Security;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddSecurity(this IServiceCollection services)
    {
        var key = Encoding.UTF8.GetBytes(TokenConfiguration.Secret);

        services.AddAuthentication()
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),

                    ClockSkew = TimeSpan.Zero
                };
            });

        services.AddAuthorization();
        
        return services;
    }
}