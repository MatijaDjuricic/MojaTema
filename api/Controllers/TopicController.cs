﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.Dtos.Topic;
using api.Interfaces;
namespace api.Controllers
{
    [Route("api/topic")]
    [ApiController]
    public sealed class TopicController : ControllerBase
    {
        private readonly ITopicRepository topicRepository;
        public TopicController(ITopicRepository topicRepository) => this.topicRepository = topicRepository;
        [Authorize]
        [HttpGet("get")]
        public async Task<ActionResult<List<TopicDto>>> GetTopics() {
            if (!ModelState.IsValid) return BadRequest();
            var topics = await topicRepository.GetTopicsAsync();
            if (!topics.Any()) return NotFound();
            return Ok(topics);
        }
        [Authorize]
        [HttpGet("professor/{id:int}")]
        public async Task<ActionResult<List<TopicDto>>> GetTopicsByProfessorId ([FromRoute] int id) {
            if (!ModelState.IsValid) return BadRequest();
            var topics = await topicRepository.GetTopicsByProfessorIdAsync(id);
            if (topics == null) return NotFound($"Topics with user id {id} not found.");
            return Ok(topics);
        }
        [Authorize]
        [HttpPut("update/{id:int}")]
        public async Task<ActionResult<TopicDto>> UpdateTopic([FromRoute] int id, [FromBody] UpdateTopicRequestDto updateTopicDto) {
            if (!ModelState.IsValid) return BadRequest();
            var topicDto = await topicRepository.UpdateTopicAsync(id, updateTopicDto);
            if (topicDto == null) return NotFound($"Topic with id {id} not found.");
            return Ok(topicDto);
        }
        [Authorize]
        [HttpPut("update/status/{id:int}")]
        public async Task<ActionResult<TopicDto>> UpdateTopicStatus([FromRoute] int id, [FromBody] TopicStatusRequestDto topicStatusDto) {
            if (!ModelState.IsValid) return BadRequest();
            var topicDto = await topicRepository.UpdateTopicStatusAsync(id, topicStatusDto);
            if (topicDto == null) return NotFound($"Topic with id {id} not found.");
            return Ok(topicDto);
        }
        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<TopicDto>> CreateTopic([FromBody] CreateTopicRequestDto createTopicDto) {
            if (!ModelState.IsValid) return BadRequest();
            var topicDto = await topicRepository.CreateTopicAsync(createTopicDto);
            if (topicDto == null) return NotFound();
            return Ok(topicDto);
        }
        [Authorize]
        [HttpDelete("delete/{id:int}")]
        public async Task<ActionResult<TopicDto>> DeleteTopic([FromRoute] int id, [FromQuery] int professorId) {
            if (!ModelState.IsValid) return BadRequest();
            var topicDto = await topicRepository.DeleteTopicAsync(id, professorId);
            if (topicDto == null) return NotFound($"Topic with id {id} not found.");
            return Ok(topicDto);
        }
    }
}