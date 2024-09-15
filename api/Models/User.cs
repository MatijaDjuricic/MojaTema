using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
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
        public string Password { get; set; } = null!;
        [Column("uloga")]
        public int roleStatus { get; set; }
        [Column("vreme_kreiranja")]
        public DateTime createdAt { get; set; } = DateTime.Now;
        [Column("vreme_izmene")]
        public DateTime editedAt { get; set; } = DateTime.Now;
    }
}