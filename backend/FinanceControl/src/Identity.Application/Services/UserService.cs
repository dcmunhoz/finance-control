using Identity.Application.Common;
using Identity.Application.Errors;
using Identity.Application.Interfaces.Repository;
using Identity.Application.Interfaces.Service;
using Identity.Application.Models;
using Identity.Application.Responses.User;
using Results;

namespace Identity.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Result<UserRegisteredResponse>> CreateAsync(string name, string email, string password, CancellationToken cancellationToken)
    {
        if (await _userRepository.ExistsByEmailAsync(email, cancellationToken))
            return Error.User.UserAlreadyExists;
        
        var hashPassword = HashService.Compute(password);
        User user = new(name, email, hashPassword);
        
        await _userRepository.CreateAsync(user, cancellationToken);

        return new UserRegisteredResponse(user.Id, user.Name, user.Email);
    }
}