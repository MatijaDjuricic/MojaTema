using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Models;
using Microsoft.IdentityModel.Tokens;
namespace api.Service
{
    public class JWTService
    {
        private readonly IConfiguration config;
        public JWTService(IConfiguration config) => this.config = config;
        public string GenerateUserToken(User user) {
            #pragma warning disable CS8604
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            #pragma warning restore CS8604
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            #pragma warning disable CS8604
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("id", user.Id.ToString()),
                new Claim("firstName", user.firstName),
                new Claim("lastName", user.lastName),
                new Claim("email", user.Email?.ToString()),
                new Claim("roleStatus", user.roleStatus.ToString())
            };
            #pragma warning restore CS8604
            var token = new JwtSecurityToken(
                config["Jwt:Issuer"],
                config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}