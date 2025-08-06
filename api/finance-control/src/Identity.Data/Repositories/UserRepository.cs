using Identity.Business.Users;
using Identity.Business.Users.Repository;

namespace Identity.Data.Repositories;

public class UserRepository(IdentityDbContext context) : IUserRepository
{
    public async Task<bool> CreateAsync(User user, CancellationToken cancellationToken)
    {
        await context.Users.AddAsync(user, cancellationToken);
        return await context.SaveChangesAsync(cancellationToken) > 0;
    }
}