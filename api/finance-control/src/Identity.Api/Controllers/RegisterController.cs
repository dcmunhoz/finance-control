using Identity.Api.Contracts.Register;
using Identity.Business.Users;
using Identity.Business.Users.Services.UserService;
using Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Api.Controllers;

[Route("api/register/")]
[ApiController]
public class RegisterController(IdentityDbContext context,
                                UserService userService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> RegisterAsync(NewUserRequest request, CancellationToken cancellationToken)
        => Ok(await userService.NewUserAsync(request.Name, request.Email, request.Password, cancellationToken));
}