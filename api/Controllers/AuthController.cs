using Microsoft.AspNetCore.Mvc;
using api.Dtos.Auth;
using api.Interfaces;
using api.Services;
using api.Models;
namespace api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    sealed public class AuthController : ControllerBase
    {
        private readonly IAuthRepository authRepository;
        private readonly IUserRepository userRepository;
        private readonly JWTService jwtService;
        public AuthController(IAuthRepository authRepository, IUserRepository userRepository, IConfiguration config) {
            this.authRepository = authRepository;
            this.userRepository = userRepository;
            jwtService = new JWTService(config);
        }
        [HttpPost("login")]
        public async Task<ActionResult<ResponseAuthTokenDto>> UserLogin([FromBody] LoginDto loginDto) {
            if (!ModelState.IsValid) return BadRequest();
            var user = await authRepository.LoginAsync(loginDto);
            if (user == null) return BadRequest();
            var accessToken = jwtService.GenerateAccessToken(user);
            var storedRefreshToken = await authRepository.GetRefreshTokenByUserId(user.Id);
            if (string.IsNullOrEmpty(storedRefreshToken)) {
                var refreshToken = jwtService.GenerateRefreshToken();
                await authRepository.StoreRefreshToken(user.Id, refreshToken, DateTime.UtcNow.AddDays(30));
                authRepository.SetHttpOnlyCookie("refreshToken", refreshToken, DateTime.UtcNow.AddDays(30));
            } else authRepository.SetHttpOnlyCookie("refreshToken", storedRefreshToken, DateTime.UtcNow.AddDays(30));
            return Ok(new ResponseAuthTokenDto { user = user, accessToken = accessToken });
        }
        [HttpGet("verify")]
        public async Task<ActionResult> VerifyToken() {
            var accessToken = authRepository.GetAccessToken(Request.Headers["Authorization"]!);
            var refreshToken = Request.Cookies["refreshToken"];
            User? user;
            if (string.IsNullOrEmpty(accessToken)) {
                if (string.IsNullOrEmpty(refreshToken)) return Unauthorized("Access token not found");
                var storedRefreshToken = await authRepository.GetRefreshToken(refreshToken);
                if (storedRefreshToken == null) return BadRequest("Invalid refresh token");
                user = await userRepository.GetUserByIdAsync(storedRefreshToken.UserId, $"User{storedRefreshToken.UserId}");
                if (user == null) return NotFound("User not found");
                var newAccessToken = jwtService.GenerateAccessToken(user);
                return Ok(new ResponseAuthTokenDto { user = user, accessToken = newAccessToken });
            }
            var userIdClaim = jwtService.VerifyAccessToken(accessToken);
            if (userIdClaim == null) return NotFound("Invalid token: User ID not found");
            int userId = int.Parse(userIdClaim.Value);
            user = await userRepository.GetUserByIdAsync(userId, $"User{userId}");
            if (user == null) return NotFound("User not found");
            return Ok(new ResponseAuthTokenDto { user = user, accessToken = accessToken });
        }
        [HttpPost("refresh")]
        public async Task<ActionResult<ResponseAuthTokenDto>> RefreshToken() {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken)) return BadRequest("Refresh token is not in request header");
            if (!await authRepository.VerifyRefreshToken(refreshToken)) return Unauthorized("Invalid refresh token");
            var storedRefreshToken = await authRepository.GetRefreshToken(refreshToken);
            if (storedRefreshToken == null) return BadRequest("Invalid refresh token");
            var user = await userRepository.GetUserByIdAsync(storedRefreshToken.UserId, $"User{storedRefreshToken.UserId}");
            if (user == null) return BadRequest("User not found");
            var accessToken = jwtService.GenerateAccessToken(user);
            var newRefreshToken = jwtService.GenerateRefreshToken();
            await authRepository.RemoveRefreshToken(storedRefreshToken.Token);
            await authRepository.StoreRefreshToken(user.Id, newRefreshToken, DateTime.UtcNow.AddDays(30));
            authRepository.SetHttpOnlyCookie("refreshToken", storedRefreshToken.Token, DateTime.UtcNow.AddDays(30));
            return Ok(new ResponseAuthTokenDto { user = user, accessToken = accessToken });
        }
        [HttpPost("logout")]
        public void Logout() => authRepository.DeleteHttpOnlyCookie("refreshToken");
    }
}