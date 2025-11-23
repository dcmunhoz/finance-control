using Identity.Application.Common;
using Identity.Application.Interfaces.Repository;
using Identity.Application.Interfaces.Service;
using Identity.Application.Models;
using Results;

namespace Identity.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Result<User>> CreateAsync(string name, string email, string password, CancellationToken cancellationToken)
    {
        var hashPassword = HashService.Compute(password);
        User user = new(name, email, hashPassword);
        //TODO: Verificar se usuário já existe
        
        await _userRepository.CreateAsync(user, cancellationToken);

        return user;
    }
}