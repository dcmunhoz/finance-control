using BaseApi;
using Microsoft.AspNetCore.Mvc;
using Identity.Application.Interfaces.Service;
using Identity.Application.Requests.User;

namespace Identity.Api.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthenticationController : ApiControllerBase
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
        return CreateResponseOnCreated(result, "/api/auth/login");
    }
}