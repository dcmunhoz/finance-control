namespace Identity.Application.Responses.User;

public record UserRegisteredResponse(Guid Id, string Name, string Email);