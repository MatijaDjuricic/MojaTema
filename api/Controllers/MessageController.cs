using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.Interfaces;
using api.Dtos.Message;
namespace api.Controllers
{
    [Route("api/message")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository messageRepository;
        public MessageController(IMessageRepository messageRepository) => this.messageRepository = messageRepository;
        [Authorize]
        [HttpGet("receiver/{id:int}")]
        public async Task<ActionResult<ReceiverUserDto?>> GetReceiverUserById([FromRoute] int id) {
            if (!ModelState.IsValid) return BadRequest();
            var receiver = await messageRepository.GetReceiverUserByIdAsync(id);
            if (receiver == null) return NotFound();
            return Ok(receiver);
        }
        [Authorize]
        [HttpGet("chats/user/{id:int}")]
        public async Task<ActionResult<List<ChatsUserDto>?>> GetChatsUserById([FromRoute] int id) {
            if (!ModelState.IsValid) return BadRequest();
            var chats = await messageRepository.GetChatsUserByIdAsync(id);
            if (chats == null) return NotFound();
            return Ok(chats);
        }
    }
}