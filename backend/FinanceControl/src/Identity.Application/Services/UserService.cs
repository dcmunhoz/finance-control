using Identity.Application.ApplicationErros;
using Identity.Application.Common;
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
            return Errors.User.UserAlreadyExists;
        
        var hashPassword = HashService.Compute(password);
        User user = new(name, email, hashPassword);
        
        await _userRepository.CreateAsync(user, cancellationToken);

        return new UserRegisteredResponse(user.Id, user.Name, user.Email);
    }

    public async Task<Result<UserAuthenticatedResponse>> LoginAsync(string email, string password, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByEmailAsync(email, cancellationToken);
        if (user is null)
            return Errors.User.UserNotFound;
        
        var hashPassword = HashService.Compute(password);
        if (user.Password != hashPassword)
            return Errors.User.InvalidPassword;

        var token = TokenService.CreateToken(user);
        
        return new UserAuthenticatedResponse { Token = token, Name = user.Name, Email = user.Email };
    }
}