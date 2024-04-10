using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using api.Dtos.ReportedTopicDto;
namespace api.Controllers
{
    [Route("api/v1/topic")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ITopicRepository topicRepository;
        public TopicController(ITopicRepository topicRepository) {
            this.topicRepository = topicRepository;
        }
        [HttpGet("get")]
        public async Task<ActionResult<List<Topic>>> GetTopics() {
            if (!ModelState.IsValid) return BadRequest();
            var topics = await topicRepository.GetTopicsWithReportedTopicsAsync();
            if (!topics.Any()) return NotFound();
            return Ok(topics);
        }
        [HttpPost("reported/add")]
        public async Task<ActionResult<ReportedTopic>> AddReportedTopic([FromBody] ReportedTopicDto reportedTopicDto) {
            if (!ModelState.IsValid) return BadRequest();
            return Ok(await topicRepository.AddReportedTopicAsync(reportedTopicDto));
        }
        [HttpPost("reported/remove")]
        public async Task<ActionResult<ReportedTopicDto>> RemoveReportedTopic([FromBody] ReportedTopicDto reportedTopicDto) {
            if (!ModelState.IsValid) return BadRequest();
            return Ok(await topicRepository.RemoveReportedTopicAsync(reportedTopicDto));
        }
    }
}