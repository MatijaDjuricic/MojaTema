using System;
using System.Collections.Generic;
using System.Linq;
using api.Dtos.User;
using api.Interfaces;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly JWTService jwtService;
        public UserController(IUserRepository userRepository, IConfiguration config) {
            this.userRepository = userRepository;
            jwtService = new(config);
        }
        [Authorize]
        [HttpGet("get")]
        public async Task<ActionResult<List<User>>> GetUsers() {
            if (!ModelState.IsValid) return BadRequest();
            return Ok(await userRepository.GetUsersAsync());
        }
        [HttpPost("login")]
        public async Task<ActionResult<User>> UserLogin([FromBody] LoginDto loginDto) {
            if (!ModelState.IsValid) return BadRequest();
            var user = await userRepository.UserLoginAsync(loginDto.password);
            if (user == null) {
                var mentor = await userRepository.MentorLoginAsync(loginDto.password);
                if (mentor == null) return NotFound();
                return Ok(new ResponseUserTokenDto { access_token = jwtService.GenerateMentorToken(mentor) });
            }
            return Ok(new ResponseUserTokenDto { access_token = jwtService.GenerateUserToken(user) });
        }
    }
}