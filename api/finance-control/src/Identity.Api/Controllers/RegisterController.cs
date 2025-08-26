using Common.Contracts.Responses;
using Identity.Api.Contracts.Register;
using Identity.Business.Users.Repository;
using Identity.Business.Users.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Api.Controllers;

[Route("api/register/")]
[ApiController]
public class RegisterController(IUserRepository userRepository,
                                UserService userService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> RegisterAsync(NewUserRequest request, CancellationToken cancellationToken)
    { 
        // TODO: Check valid email;
        
        if (await userRepository.ExistAsync(w => w.Email.Equals(request.Email), cancellationToken))
            return Conflict(new ErrorResponse("Usuário existente.", "Usuário informado já cadastrdo."));
        
        return Ok(await userService.RegisterAsync(request.Name, request.Email, request.Password, cancellationToken));
    }
}   