namespace Identity.Api.Requests;

public record NewUserRequest(string Name, string Email, string Password);