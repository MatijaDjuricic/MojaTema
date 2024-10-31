using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Izbor_maturskog_rada")]
    public class SelectionGraduationPaper
    {
        [Column("id_izbor_maturskog_rada")]
        public int Id { get; set; }
        [Column("id_teme")]
        public string topicId { get; set; } = null!;
        [Column("status")]
        public string Status { get; set; } = null!;
        [Column("datum_predaje")]
        public DateTime? submissionDate { get; set; }
        [Column("datum_odobrenja")]
        public DateTime? approvalDate { get; set; }
        [Column("putanja_do_fajla")]
        public string filePath { get; set; } = null!;
    }
}