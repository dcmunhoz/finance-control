using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Identity.Application.Models;
using Microsoft.IdentityModel.Tokens;
using Security;

namespace Identity.Application.Common;

public static class TokenService
{
    public static string CreateToken(User user)
    {
        var key = Encoding.UTF8.GetBytes(TokenConfiguration.Secret);
        var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
        };

        var token = new JwtSecurityToken(claims: claims,
                                         expires: DateTime.Now.AddHours(1),
                                         signingCredentials: creds);
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}