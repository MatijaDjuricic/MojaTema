using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Topic;
using api.Models;
namespace api.Mappers
{
    public static class TopicMapper
    {
        public static TopicDto ToTopicDto(this Topic topicModel)
        {
            return new TopicDto
            {
                Id = topicModel.Id,
                Title = topicModel.Title,
                Description = topicModel.Description,
                Status = topicModel.Status.ToString(),
                studentId = topicModel.studentId,
                professorId = topicModel.professorId,
                subjectId = topicModel.subjectId,
                studentUserId = topicModel.Student != null ? topicModel.Student.User.Id : null,
                subjectTitle = topicModel.Subject.Title,
                professorUsername = $"{topicModel.User.firstName} {topicModel.User.lastName}",
                studentUsername = topicModel.Student != null ? $"{topicModel.Student.User.firstName} {topicModel.Student.User.lastName}" : null,
            };
        }
    }
}