using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.ResponseReportedTopic;
using api.Dtos.ReportedTopicDto;
using api.Dtos.Topic;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;
namespace api.Repository
{
    public class TopicRepository : ITopicRepository
    {
        private readonly DataContext context;
        private readonly UtilityFunction utilityFunction;
        public TopicRepository(DataContext context) {
            this.context = context;
            utilityFunction = new(context);
        }
        public async Task<List<Topic>> GetTopicsAsync() => await context.Topics.ToListAsync();
        public async Task<List<TopicDto>> GetTopicsWithReportedTopicsAsync() {
            var reportedTopics = await context.ReportedTopics.Select(rt =>
            rt.ToReportedTopicDto(utilityFunction.getUsernameById(rt.user_id))).ToListAsync();
            return await context.Topics.Select(t => t.ToTopicDto(reportedTopics,
            utilityFunction.getSubjectTitleById(t.subject_id), utilityFunction.getUsernameById(t.user_id),
            utilityFunction.getMentorNameById(t.mentor_id))).ToListAsync();
        }
        public async Task<List<TopicDto>> GetReportedTopicsByMentorIdAsync(int id) {
            var reportedTopics = await context.ReportedTopics.Select(rt =>
            rt.ToReportedTopicDto(utilityFunction.getUsernameById(rt.user_id))).ToListAsync();
            return await context.Topics.Where(t => t.mentor_id == id).Select(t => t.ToTopicDto(reportedTopics,
            utilityFunction.getSubjectTitleById(t.subject_id), utilityFunction.getUsernameById(t.user_id),
            utilityFunction.getMentorNameById(t.mentor_id))).ToListAsync();
        }
        public async Task<List<ResponseReportedTopicDto>> GetReportedUsersTopicsByMentorIdAsync(int id) {
            var usersFromReportedTopics = await context.ReportedTopics
            .Where(rt => context.Topics.Any(t => t.mentor_id == id && t.topic_id == rt.topic_id))
            .Join(context.Users, rt => rt.user_id, u => u.user_id, (rt, u) => new ResponseReportedTopicDto {
                user_id = u.user_id,
                mentor_id = id,
                first_name = u.first_name,
                last_name = u.last_name
            }).Distinct().ToListAsync();
            return usersFromReportedTopics;
        }
        public async Task<List<ResponseReportedTopicDto>> GetReportedMentorsTopicsByUserIdAsync(int id) {
            var mentorsFromReportedTopics = await context.ReportedTopics
            .Where(rt => context.Users.Any(u => u.user_id == id && u.user_id == rt.user_id))
            .Join(context.Mentors, rt => rt.mentor_id, u => u.mentor_id, (rt, u) => new ResponseReportedTopicDto {
                user_id = id,
                mentor_id = u.mentor_id,
                first_name = u.first_name,
                last_name = u.last_name
            }).Distinct().ToListAsync();
            return mentorsFromReportedTopics;
        }
        public async Task<ReportedTopic> AddReportedTopicAsync(ReportedTopicDto reportedTopicDto) {
            await context.ReportedTopics.AddAsync(reportedTopicDto.ToTopicDtoFromAdd());
            await context.SaveChangesAsync();
            return reportedTopicDto.ToResponseReportedTopic(utilityFunction.getUsernameById(reportedTopicDto.user_id));
        }
        public async Task<ReportedTopicDto> RemoveReportedTopicAsync(ReportedTopicDto reportedTopicDto) {
            context.ReportedTopics.Remove(reportedTopicDto.ToTopicDtoFromAdd());
            await context.SaveChangesAsync();
            return reportedTopicDto;
        }
    }
}