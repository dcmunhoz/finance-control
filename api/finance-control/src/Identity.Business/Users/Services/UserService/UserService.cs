using Identity.Business.Users.Repository;

namespace Identity.Business.Users.Services.UserService;

public class UserService(IUserRepository repository)
{
    public async Task<bool> NewUserAsync(string name, string email, string password, CancellationToken cancellationToken)
    {
        User user = new(name, email, password);
        return await repository.CreateAsync(user, cancellationToken);
    }
}