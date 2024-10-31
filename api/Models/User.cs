using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
namespace api.Models
{
    [Table("Korisnik")]
    public class User
    {
        [Column("id_korisnika")]
        public int Id { get; set; }
        [Column("ime")]
        public string firstName { get; set; } = null!;
        [Column("prezime")]
        public string lastName { get; set; } = null!;
        [Column("i_mejl")]
        public string Email { get; set; } = null!;
        [Column("lozinka")]
        [JsonIgnore]
        public string Password { get; set; } = null!;
        [Column("uloga")]
        public int roleStatus { get; set; }
        [Column("vreme_kreiranja")]
        public DateTime createdAt { get; set; } = DateTime.Now;
        [Column("vreme_izmene")]
        public DateTime editedAt { get; set; } = DateTime.Now;
    }
}