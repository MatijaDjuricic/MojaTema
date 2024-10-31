using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Ispit")]
    public class Exam
    {
        [Column("id_ispita")]
        public int Id { get; set; }
        [Column("naziv_ispita")]
        public string Title { get; set; } = null!;
        [Column("datum_i_vreme")]
        public DateTime dateTime { get; set; }
        [Column("id_predmeta")]
        public int? subjectId { get; set; }
        [Column("id_ucionice")]
        public int? classId { get; set; }
    }
}