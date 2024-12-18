using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using api.Models;
namespace api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public sealed class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        public UserController(IUserRepository userRepository) => this.userRepository = userRepository;
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
            return Ok(await userRepository.GetUserByIdAsync(id));
        }
    }
}