using Identity.Application.Models;
using Identity.Application.Responses.User;
using Results;

namespace Identity.Application.Interfaces.Service;

public interface IUserService
{
    Task<Result<UserRegisteredResponse>> CreateAsync(string name, string email, string password, CancellationToken cancellationToken);
    Task<Result<User>> LoginAsync(string email, string password, CancellationToken cancellationToken);
}