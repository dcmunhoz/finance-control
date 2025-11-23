using Identity.Api.Requests;
using Microsoft.AspNetCore.Mvc;
using Identity.Application.Interfaces.Service;

namespace Identity.Api.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthenticationController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] NewUserRequest request, CancellationToken cancellationToken)
    {
        var result = await _userService.CreateAsync(request.Name, request.Email, request.Password, cancellationToken);
        
        if (result.HasError)
            return BadRequest(result.Errors.First().Message);
        
        return Ok(result.Value);
    }
}