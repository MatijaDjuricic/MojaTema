using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ResponseReportedTopic;
using api.Dtos.ReportedTopicDto;
using api.Dtos.Topic;
using api.Models;
namespace api.Interfaces
{
    public interface ITopicRepository
    {
        Task<List<Topic>> GetTopicsAsync();
        Task<List<TopicDto>> GetTopicsWithReportedTopicsAsync();
        Task<List<TopicDto>> GetReportedTopicsByMentorIdAsync(int id);
        Task<List<ResponseReportedTopicDto>> GetReportedUsersTopicsByMentorIdAsync(int id);
        Task<List<ResponseReportedTopicDto>> GetReportedMentorsTopicsByUserIdAsync(int id);
        Task<ReportedTopic> AddReportedTopicAsync(ReportedTopicDto reportedTopicDto);
        Task<ReportedTopicDto> RemoveReportedTopicAsync(ReportedTopicDto reportedTopicDto);
    }
}