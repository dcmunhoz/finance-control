using Results;

namespace Identity.Application.Errors;

public partial class Error
{
    public static class User
    {
        public static ResultError UserAlreadyExists => new ResultError("User ");
    }
}