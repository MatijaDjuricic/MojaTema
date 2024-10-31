using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Tema")]
    public class Topic
    {
        [Column("id_teme")]
        public int Id { get; set; }
        [Column("naziv")]
        public string Title { get; set; } = null!;
        [Column("opis")]
        public string Description { get; set; } = null!;
        [Column("status")]
        public int Status { get; set; }
        [Column("id_predmeta")]
        public int subjectId { get; set; }
        [Column("id_profesora")]
        public int professorId { get; set; }
        [Column("id_ucenika")]
        public int? studentId { get; set; }
        public User User { get; set; } = null!;
        public Subject Subject { get; set; } = null!;
        public Student? Student { get; set; }
    }
}