namespace Identity.Application.Requests.User;

public record NewUserRequest(string Name, string Email, string Password);