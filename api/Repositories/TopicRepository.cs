using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Enums;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Dtos.Topic;
namespace api.Repositories
{
    public class TopicRepository : ITopicRepository
    {
        private readonly DataContext context;
        private readonly ICacheService cacheService;
        public TopicRepository(DataContext context, ICacheService cacheService) {
            this.context = context;
            this.cacheService = cacheService;
        }
        public async Task<List<TopicDto>> GetTopicsAsync(string cacheKey) {
            var cachedTopics = await cacheService.VerifyCacheList<TopicDto>(cacheKey);
            if (cachedTopics != null) return cachedTopics;
            var topics = await context.Topics.Include(t => t.User)
            .Include(t => t.Student).ThenInclude(s => s != null ? s.User : null)
            .Include(t => t.Subject).ToListAsync();
            var topicsDto = topics.Select(t => t.ToTopicDto()).ToList();
            await cacheService.SetCache(topicsDto, cacheKey);
            return topicsDto;
        }
        public async Task<List<TopicDto>?> GetTopicsByProfessorIdAsync(int id, string cacheKey) {
            var cachedTopics = await cacheService.VerifyCacheList<TopicDto>(cacheKey);
            if (cachedTopics != null) return cachedTopics;
            var topics = await context.Topics.Include(t => t.User)
            .Include(t => t.Student)
            .ThenInclude(s => s != null ? s.User : null)
            .Include(t => t.Subject)
            .Where(t => t.professorId == id).ToListAsync();
            if (topics == null || !topics.Any()) return null;
            var topicsDto = topics.Select(t => t.ToTopicDto()).ToList();
            await cacheService.SetCache(topicsDto, cacheKey);
            return topicsDto;
        }
        public async Task<TopicDto?> UpdateTopicAsync(int id, UpdateTopicRequestDto updateTopicDto) {
            var topic = await context.Topics.Include(t => t.User)
            .Include(t => t.Student)
            .ThenInclude(s => s != null ? s.User : null)
            .Include(t => t.Subject)
            .FirstOrDefaultAsync(t => t.Id == id);
            if (topic == null) return null;
            var student = await context.Students.FirstOrDefaultAsync(s => s.userId == updateTopicDto.studentUserId);
            if (student == null) return null;
            if (topic.Student?.Id == student.Id) {
                topic.studentId = null;
                topic.Status = (int)TopicEnum.SLOBODNA;
            } else {
                topic.studentId = student.Id;
                topic.Status = (int)TopicEnum.NA_CEKANJU;
            }
            await context.SaveChangesAsync();
            return await context.Topics
                    .Include(t => t.User)
                    .Include(t => t.Student)
                    .ThenInclude(s => s.User)
                    .Include(t => t.Subject)
                    .Where(t => t.Id == id)
                    .Select(t => t.ToTopicDto())
                    .FirstOrDefaultAsync();
        }
        public async Task<TopicDto?> UpdateTopicStatusAsync(int id, TopicStatusRequestDto topicStatusDto) {
            var topic = await context.Topics.Include(t => t.User)
            .Include(t => t.Student)
            .ThenInclude(s => s != null ? s.User : null)
            .Include(t => t.Subject)
            .FirstOrDefaultAsync(t => t.Id == id);
            if (topic == null) return null;
            var professor = await context.ProfessorSubjects.FirstOrDefaultAsync(s => s.userId == topicStatusDto.professorId);
            if (professor == null || professor.userId != topic.professorId) return null;
            if (topicStatusDto.topicStatus == (int)TopicEnum.SLOBODNA) {
                topic.studentId = null;
                topic.Status = (int)TopicEnum.SLOBODNA;
            } else {
                topic.Status = topicStatusDto.topicStatus;
            }
            await context.SaveChangesAsync();
            var topicDto = await context.Topics.Include(t => t.User)
            .Include(t => t.Student)
            .ThenInclude(s => s != null ? s.User : null)
            .Include(t => t.Subject)
            .FirstOrDefaultAsync(t => t.Id == id);
            return topicDto?.ToTopicDto();
        }
        public async Task<TopicDto?> CreateTopicAsync(CreateTopicRequestDto createTopicDto) {
            if (createTopicDto == null) return null;
            var professorExists = await context.Users.AnyAsync(u => u.Id == createTopicDto.professorId);
            if (!professorExists) return null;
            var subjectExists = await context.Subject.AnyAsync(s => s.Id == createTopicDto.subjectId);
            if (!subjectExists) return null;
            var topic = new Topic {
                Title = createTopicDto.title,
                Description = createTopicDto.description,
                subjectId = createTopicDto.subjectId,
                professorId = createTopicDto.professorId,
                Status = (int)TopicEnum.SLOBODNA,
            };
            context.Topics.Add(topic);
            await context.SaveChangesAsync();
            var topicDto = await context.Topics.Include(t => t.User)
            .Include(t => t.Student)
            .ThenInclude(s => s != null ? s.User : null)
            .Include(t => t.Subject)
            .FirstOrDefaultAsync(t => t.Id == topic.Id);
            return topic?.ToTopicDto();
        }
        public async Task<TopicDto?> DeleteTopicAsync(int id, int professorId) {
            var professor = await context.ProfessorSubjects.FirstOrDefaultAsync(s => s.userId == professorId);
            if (professor == null) return null;
            var topic = await context.Topics.Include(t => t.User)
            .Include(t => t.Student)
            .ThenInclude(s => s != null ? s.User : null)
            .Include(t => t.Subject)
            .FirstOrDefaultAsync(t => t.Id == id);
            if (topic == null || topic.subjectId != professor.subjectId) return null;
            context.Topics.Remove(topic);
            await context.SaveChangesAsync();
            return topic.ToTopicDto();
        }
    }
}