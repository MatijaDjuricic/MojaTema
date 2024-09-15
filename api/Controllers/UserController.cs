using System;
using System.Collections.Generic;
using System.Linq;
using api.Dtos.User;
using api.Interfaces;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            jwtService = new JWTService(config);
        }
        [Authorize]
        [HttpGet("get")]
        public async Task<ActionResult<List<User>>> GetUsers() {
            if (!ModelState.IsValid) return BadRequest();
            return Ok(await userRepository.GetUsersAsync());
        }
        [Authorize]
        [HttpGet("get/{id:int}")]
        public async Task<ActionResult<User>> GetUserById([FromRoute] int id) {
            if (!ModelState.IsValid) return BadRequest();
            var user = await userRepository.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<ActionResult<ResponseUserTokenDto>> UserLogin([FromBody] LoginDto loginDto) {
            if (!ModelState.IsValid) return BadRequest();
            var user = await userRepository.UserLoginAsync(loginDto);
            if (user == null) return BadRequest(new ResponseUserTokenDto { accessToken = string.Empty });
            return Ok(new ResponseUserTokenDto { accessToken = jwtService.GenerateUserToken(user) });
        }
    }
}