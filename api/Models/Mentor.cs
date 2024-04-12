using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace api.Models
{
    [Table("Profesor")]
    public class Mentor
    {
        [Column("profesor_id")]
        public int mentor_id { get; set; }
        [Column("ime")]
        public string first_name { get; set; } = null!;
        [Column("prezime")]
        public string last_name { get; set; } = null!;
        [Column("kod")]
        public string password { get; set; } = null!;
        [Column("predmet_id")]
        public int subject_id { get; set; }
    }
}