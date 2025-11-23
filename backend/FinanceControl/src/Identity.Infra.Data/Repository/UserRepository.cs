using Identity.Application.Interfaces.Repository;
using Identity.Application.Models;
using Microsoft.Extensions.Configuration;

namespace Identity.Infra.Data.Repository;

public class UserRepository(IdentityContext context) : IUserRepository
{
    public async Task CreateAsync(User user, CancellationToken cancellationToken)
    {
        await context.Users.AddAsync(user, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }
}