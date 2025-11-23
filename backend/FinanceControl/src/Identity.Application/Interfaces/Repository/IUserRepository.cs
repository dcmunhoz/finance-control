using Identity.Application.Models;

namespace Identity.Application.Interfaces.Repository;

public interface IUserRepository
{
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken);
    Task CreateAsync(User user, CancellationToken cancellationToken);
}