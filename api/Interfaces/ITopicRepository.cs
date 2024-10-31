using api.Dtos.Topic;
namespace api.Interfaces
{
    public interface ITopicRepository
    {
        Task<List<TopicDto>> GetTopicsAsync(string cacheKey = "TopicsList");
        Task<List<TopicDto>?> GetTopicsByProfessorIdAsync(int Id, string cacheKey = "TopicsByProfessorId");
        Task<TopicDto?> UpdateTopicAsync(int Id, UpdateTopicRequestDto updateTopicDto);
        Task<TopicDto?> UpdateTopicStatusAsync(int Id, TopicStatusRequestDto topicStatusDto);
        Task<TopicDto?> CreateTopicAsync(CreateTopicRequestDto createTopicDto);
        Task<TopicDto?> DeleteTopicAsync(int Id, int professorId);
    }
}