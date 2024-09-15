using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace api.Dtos.Topic
{
    public class TopicStatusRequestDto
    {
        public int professorId { get; set; }
        public int topicStatus { get; set; }
    }
}