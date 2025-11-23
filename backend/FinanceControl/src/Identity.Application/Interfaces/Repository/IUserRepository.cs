using Identity.Application.Models;

namespace Identity.Application.Interfaces.Repository;

public interface IUserRepository
{
    Task CreateAsync(User user, CancellationToken cancellationToken);
}