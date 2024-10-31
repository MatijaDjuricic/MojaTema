using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Profesor_predmet")]
    public class ProfessorSubject
    {
        [Column("id_profesor_predmet")]
        public int Id { get; set; }
        [Column("id_korisnika")]
        public int userId { get; set; }
        [Column("id_predmeta")]
        public int subjectId { get; set; }
    }
}