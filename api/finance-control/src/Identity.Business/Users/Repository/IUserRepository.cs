namespace Identity.Business.Users.Repository;

public interface IUserRepository
{
    public Task<bool> CreateAsync(User user, CancellationToken cancellationToken);
}