using Identity.Application.Models;
using Results;

namespace Identity.Application.Interfaces.Service;

public interface IUserService
{
    Task<Result<User>> CreateAsync(string name, string email, string password, CancellationToken cancellationToken);
}