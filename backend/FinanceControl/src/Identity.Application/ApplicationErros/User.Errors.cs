using Results;

namespace Identity.Application.ApplicationErros;

public static partial class Errors
{
    public static class User
    {
        public static ResultError UserAlreadyExists => new("Já existe um usuário cadastrado com esse e-mail.");
        public static ResultError UserNotFound => new("Usuário não encontrado.");
        public static ResultError InvalidPassword => new("Senha incorreta.");
    }
}