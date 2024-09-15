using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
namespace api.Dtos.Topic
{
    public class TopicDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string subjectTitle { get; set; } = null!;
        public int subjectId { get; set; }
        public int? studentId { get; set; }
        public int? studentUserId { get; set; }
        public int professorId { get; set; }
        public string? studentUsername { get; set; }
        public string professorUsername { get; set; } = null!;
    }
}