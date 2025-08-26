using System.ComponentModel.DataAnnotations;

namespace Identity.Api.Contracts.Register;

public class NewUserRequest
{
    public string Name { get; set; }
    [EmailAddress(ErrorMessage = "E-mail inválido.")]
    public string Email { get; set; }
    public string Password { get; set; }
}