using Results;

namespace Identity.Application.Errors;

public static partial class Error
{
    public static class User
    {
        public static ResultError UserAlreadyExists => new("Já existe um usuário cadastrado com esse e-mail.");
    }
}