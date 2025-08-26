using System.Linq.Expressions;
using Identity.Business.Users;
using Identity.Business.Users.Repository;
using Microsoft.EntityFrameworkCore;

namespace Identity.Data.Repositories;

public class UserRepository(IdentityDbContext context) : IUserRepository
{

    public async Task<bool> ExistAsync(Expression<Func<User, bool>> predicate, CancellationToken cancellationToken)
        => await context.Users.AnyAsync(predicate, cancellationToken);
    
    public async Task<bool> CreateAsync(User user, CancellationToken cancellationToken)
    {
        await context.Users.AddAsync(user, cancellationToken);
        return await context.SaveChangesAsync(cancellationToken) > 0;
    }
}