using api.Dtos.Auth;
using api.Models;
namespace api.Interfaces
{
    public interface IAuthRepository
    {
        Task<User?> LoginAsync(LoginDto loginDto);
        Task StoreRefreshToken(int userId, string refreshToken, DateTime expiration);
        Task<RefreshToken?> GetRefreshToken(string refreshToken);
        Task<string?> GetRefreshTokenByUserId(int userId);
        Task<int?> GetUserIdByUserByToken(string refreshToken);
        Task<bool> VerifyRefreshToken(string refreshToken);
        Task RemoveRefreshToken(string refreshToken);
        string? GetAccessToken(string authHeader);
        void SetHttpOnlyCookie(string cookie, string token, DateTime expiration);
        void DeleteHttpOnlyCookie(string cookie);
    }
}