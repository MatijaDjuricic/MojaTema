using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ReportedTopicDto;
using api.Dtos.Topic;
using api.Models;
namespace api.Interfaces
{
    public interface ITopicRepository
    {
        Task<List<Topic>> GetTopicsAsync();
        Task<List<TopicDto>> GetTopicsWithReportedTopicsAsync();
        Task<ReportedTopic> AddReportedTopicAsync(ReportedTopicDto reportedTopicDto);
        Task<ReportedTopicDto> RemoveReportedTopicAsync(ReportedTopicDto reportedTopicDto);
    }
}