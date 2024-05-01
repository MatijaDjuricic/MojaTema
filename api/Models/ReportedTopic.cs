using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace api.Models
{
    [Table("PrijavljenaTema")]
    public class ReportedTopic
    {
        [Column("tema_id")]
        public int topic_id { get; set; }
        [Column("ucenik_id")]
        public int user_id { get; set; }
        [Column("profesor_id")]
        public int mentor_id { get; set; }
        [NotMapped]
        public string student_username { get; set; } = string.Empty;
    }
}