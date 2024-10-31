using api.Models;
namespace api.Dtos.Auth
{
    public class ResponseAuthTokenDto
    {
        public User? user { get; set; }
        public string? accessToken { get; set; }
    }
}