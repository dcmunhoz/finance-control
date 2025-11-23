namespace Identity.Application.Responses.User;

public class UserAuthenticatedResponse
{
    public string Token { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}