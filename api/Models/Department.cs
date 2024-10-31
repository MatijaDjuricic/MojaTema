using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Odeljenje")]
    public class Department
    {
        [Column("id_odeljenja")]
        public int Id { get; set; }
        [Column("naziv")]
        public string Title { get; set; } = null!;
        [Column("id_razredni_staresina")]
        public int classTeacher { get; set; }
    }
}