using BaseApi;
using Microsoft.AspNetCore.Mvc;
using Identity.Application.Interfaces.Service;
using Identity.Application.Requests.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using LoginRequest = Identity.Application.Requests.User.LoginRequest;

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

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        var result = await _userService.LoginAsync(request.Email, request.Password, cancellationToken);
        return CreateResponseOnPost(result);
    }
}