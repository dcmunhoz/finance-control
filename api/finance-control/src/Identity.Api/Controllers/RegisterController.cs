using Identity.Business.Models;
using Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Api.Controllers;

[Route("api/register/")]
[ApiController]
public class RegisterController (IdentityDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult>  Register()
    {
        User user = new()
        {
            Id = Guid.NewGuid(),
            Name = "NOme",
            Email = "teste@teste.com",
            Password = "12345"
        };

        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
        
        return Ok(user);
    }
}