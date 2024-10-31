using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Predmet")]
    public class Subject
    {
        [Column("id_predmeta")]
        public int Id { get; set; }
        [Column("naziv")]
        public string Title { get; set; } = null!;
        [Column("id_razreda")]
        public int ClassId { get; set; }
    }
}