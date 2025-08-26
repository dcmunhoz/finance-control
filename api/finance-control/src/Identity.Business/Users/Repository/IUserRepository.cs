using System.Linq.Expressions;

namespace Identity.Business.Users.Repository;

public interface IUserRepository
{
    public Task<bool> ExistAsync(Expression<Func<User, bool>> predicate, CancellationToken cancellationToken);
    public Task<bool> CreateAsync(User user, CancellationToken cancellationToken);
}