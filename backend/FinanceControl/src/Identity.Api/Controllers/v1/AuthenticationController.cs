using Identity.Api.Requests;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Api.Controllers.v1;

[Route("api/auth")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    [HttpPost("register")]
    public IActionResult RegisterAsync([FromBody] NewUserRequest request, CancellationToken cancellationToken)
    {
        return Ok(request.Name);
    }
}