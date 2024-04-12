using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace api.Models
{
    [Table("Predmet")]
    public class Subject
    {
        [Column("predmet_id")]
        public int subject_id { get; set; }
        [Column("naziv")]
        public string title { get; set; } = null!;
    }
}