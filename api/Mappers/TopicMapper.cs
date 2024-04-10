using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ReportedTopicDto;
using api.Dtos.Topic;
using api.Models;
namespace api.Mappers
{
    public static class TopicMapper
    {
        public static TopicDto ToTopicDto(this Topic topicModel, string subject_title, string student_username, string professor_username) {
            return new TopicDto
            {
                id = topicModel.topic_id,
                title = topicModel.title,
                status = topicModel.status,
                info = topicModel.info,
                user_id = topicModel.user_id,
                subject_title = subject_title,
                student_username = student_username,
                professor_username = professor_username,
            };
        }
        public static ReportedTopic ToReportedTopicDto(this ReportedTopic topicModel, string student_username) {
            return new ReportedTopic
            {
                topic_id = topicModel.topic_id,
                user_id = topicModel.user_id,
                student_username = student_username,
            };
        }
        public static ReportedTopic ToTopicDtoFromAdd(this ReportedTopicDto topicModel) {
            return new ReportedTopic
            {
                user_id = topicModel.user_id,
                topic_id = topicModel.topic_id
            };
        }
        public static ReportedTopic ToResponseReportedTopic(this ReportedTopicDto topicModel, string student_username) {
            return new ReportedTopic
            {
                topic_id = topicModel.topic_id,
                user_id = topicModel.user_id,
                student_username = student_username
            };
        }
    }
}