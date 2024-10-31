using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Odbrana_maturskog_rada")]
    public class DefenseGraduationPaper
    {
        [Column("id_odbrana_maturskog_rada")]
        public int Id { get; set; }
        [Column("opis")]
        public string Description { get; set; } = null!;
        [Column("datum_i_vreme")]
        public DateTime? dateTime { get; set; }
        [Column("id_komisije")]
        public int commissionId { get; set; }
        [Column("id_teme")]
        public string topicId { get; set; } = null!;
        [Column("id_ucionice")]
        public int classRoomId { get; set; }
    }
}