using Common.Security;
using Identity.Business.Users.Repository;

namespace Identity.Business.Users.Services.UserService;

public class UserService(IUserRepository repository)
{
    public async Task<bool> RegisterAsync(string name, string email, string password, CancellationToken cancellationToken)
    {
        var encryptedPassword = Sha256Hash.Encrypt(password);
        
        User user = new(name, email, encryptedPassword);
        return await repository.CreateAsync(user, cancellationToken);
    }
}