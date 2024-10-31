using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Models;
namespace api.Services
{
    public class JWTService
    {
        private readonly IConfiguration config;
        public JWTService(IConfiguration config) => this.config = config;
        public string GenerateAccessToken(User user) {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("email", user.Email)
            };
            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: credentials,
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                expires: DateTime.Now.AddMinutes(10)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public string GenerateRefreshToken() {
            var randomNumber = new byte[64];
            using (var generator = RandomNumberGenerator.Create()) {
                generator.GetBytes(randomNumber);
            }
            return Convert.ToBase64String(randomNumber);
        }
        public Claim? VerifyAccessToken(string accessToken) {
            var handler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!)),
                ValidIssuer = config["Jwt:Issuer"],
                ValidAudience = config["Jwt:Audience"],
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
            };
            var claimsPrincipal = handler.ValidateToken(accessToken, tokenValidationParameters, out var validatedToken);
            if (validatedToken == null) return null;
            var userIdClaim = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim;
        }
    }
}