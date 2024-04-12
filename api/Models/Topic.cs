using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Tema")]
    public class Topic
    {
        [Column("tema_id")]
        public int topic_id { get; set; }
        [Column("naziv")]
        public string title { get; set; } = null!;
        [Column("status")]
        public int status { get; set; }
        [Column("info")]
        public string info { get; set; } = null!;
        [Column("ucenik_id")]
        public int? user_id { get; set; }
        [Column("predmet_id")]
        public int subject_id { get; set; }
        [Column("profesor_id")]
        public int mentor_id { get; set; }
        [NotMapped]
        public string subject_title { get; set; } = string.Empty;
        [NotMapped]
        public string student_username { get; set; } = string.Empty;
        [NotMapped]
        public string professor_username { get; set; } = string.Empty;
        [NotMapped]
        public List<ReportedTopic> reportedTopicUsers { get; set; } = new List<ReportedTopic>();
    }
}