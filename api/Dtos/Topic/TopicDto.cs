using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
namespace api.Dtos.Topic
{
    public class TopicDto
    {
        public int id { get; set; }
        public string title { get; set; } = null!;
        public string info { get; set; } = null!;
        public string subject_title { get; set; } = null!;
        public int status { get; set; }
        public int? user_id { get; set; }
        public int mentor_id { get; set; }
        public int subject_id { get; set; }
        public string student_username { get; set; } = null!;
        public string professor_username { get; set; } = null!;
        public List<ReportedTopic> reportedTopicUsers { get; set; } = new List<ReportedTopic>();
    }
}