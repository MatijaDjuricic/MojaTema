using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Dtos.User;
using api.Models;
using Microsoft.IdentityModel.Tokens;
namespace api.Service
{
    public class JWTService
    {
        private readonly IConfiguration config;
        public JWTService(IConfiguration config) {
            this.config = config;
        }
        public string GenerateUserToken(User user) {
            #pragma warning disable CS8604
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            #pragma warning restore CS8604
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            #pragma warning disable CS8604
            var claims = new[]
            {
                new Claim("id", user.user_id.ToString()),
                new Claim("first_name", user.first_name),
                new Claim("last_name", user.last_name),
                new Claim("topic_id", user.topic_id.ToString()),
                new Claim("user_class", user.user_class.ToString()),
                new Claim("role_status", RoleTypes.ucenik.ToString())
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
        public string GenerateMentorToken(Mentor mentor) {
            #pragma warning disable CS8604
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            #pragma warning restore CS8604
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var claims = new[]
            {
                new Claim("id", mentor.mentor_id.ToString()),
                new Claim("first_name", mentor.first_name),
                new Claim("last_name", mentor.last_name),
                new Claim("mentor_id", mentor.mentor_id.ToString()),
                new Claim("subject_id", mentor.subject_id.ToString()),
                new Claim("role_status", RoleTypes.mentor.ToString())
            };
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