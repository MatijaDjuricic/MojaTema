using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace api.Dtos.ReportedTopicDto
{
    public class ReportedTopicDto
    {
        public int topic_id { get; set; }
        public int user_id { get; set; }
        public int mentor_id { get; set; }
    }
}