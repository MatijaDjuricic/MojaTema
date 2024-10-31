using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Dtos.Auth;
using api.Models;
using api.Interfaces;
namespace api.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext context;
        private readonly IHttpContextAccessor httpContextAccessor;
        public AuthRepository(DataContext context, IHttpContextAccessor httpContextAccessor) {
            this.context = context;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<User?> LoginAsync(LoginDto loginDto) {
            return await context.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email && x.Password == loginDto.Password);
        }
        public async Task<RefreshToken?> GetRefreshToken(string refreshToken) {
            return await context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == refreshToken);
        }
        public async Task<string?> GetRefreshTokenByUserId(int userId) {
            var refreshToken = await context.RefreshTokens.FirstOrDefaultAsync(x => x.UserId == userId);
            if (refreshToken == null) return null;
            return refreshToken.Token;
        }
        public async Task<int?> GetUserIdByUserByToken(string refreshToken) {
            var token = await context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == refreshToken);
            if (token == null) return null;
            return token.UserId;
        }
        public async Task StoreRefreshToken(int userId, string refreshToken, DateTime expiration) {
            var token = new RefreshToken {
                Token = refreshToken,
                UserId = userId,
                Expiration = expiration,
            };
            await context.RefreshTokens.AddAsync(token);
            await context.SaveChangesAsync();
        }
        public async Task<bool> VerifyRefreshToken(string refreshToken) {
            var token = await context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == refreshToken);
            if (token == null || token.Expiration < DateTime.UtcNow) return false;
            return true;
        }
        public async Task RemoveRefreshToken(string refreshToken) {
            var token = await context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == refreshToken);
            if (token != null) {
                context.RefreshTokens.Remove(token);
                await context.SaveChangesAsync();
            }
        }
        public string? GetAccessToken(string authHeader) {
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer ")) {
                return authHeader.Substring("Bearer ".Length).Trim();
            }
            return null;
        }
        public void SetHttpOnlyCookie(string cookie, string token, DateTime expiration) {
            var responseCookies = httpContextAccessor.HttpContext?.Response.Cookies;
            if (responseCookies != null) {
                responseCookies.Append(cookie, token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false,
                    SameSite = SameSiteMode.Strict,
                    Expires = expiration
                });
            }
        }
        public void DeleteHttpOnlyCookie(string cookie) {
            var responseCookies = httpContextAccessor.HttpContext?.Response.Cookies;
            if (responseCookies != null) responseCookies.Delete(cookie);
        }
    }
}