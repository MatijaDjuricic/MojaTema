using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Topic;
namespace api.Interfaces
{
    public interface ITopicRepository
    {
        Task<List<TopicDto>> GetTopicsAsync();
        Task<List<TopicDto>?> GetTopicsByProfessorIdAsync(int Id);
        Task<TopicDto?> UpdateTopicAsync(int Id, UpdateTopicRequestDto updateTopicDto);
        Task<TopicDto?> UpdateTopicStatusAsync(int Id, TopicStatusRequestDto topicStatusDto);
        Task<TopicDto?> CreateTopicAsync(CreateTopicRequestDto createTopicDto);
        Task<TopicDto?> DeleteTopicAsync(int Id, int professorId);
    }
}