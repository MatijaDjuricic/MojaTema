using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Komisija")]
    public class Commission
    {
        [Column("id_komisije")]
        public int Id { get; set; }
        [Column("id_predsendnika")]
        public int presidentId { get; set; }
        [Column("id_mentora")]
        public int mentorId { get; set; }
        [Column("id_prvog_clana")]
        public int firstMemberId { get; set; }
        [Column("id_drugog_clana")]
        public int secondMemberId { get; set; }
    }
}