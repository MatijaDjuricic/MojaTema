using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("RefreshToken")]
    public class RefreshToken
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("token")]
        public string Token { get; set; } = null!;
        [Column("userId")]
        public int UserId { get; set; }
        [Column("isRevoked")]
        public bool isRevoked { get; set; } = false;
        [Column("expiration")]
        public DateTime Expiration { get; set; }
        [Column("createdAt")]
        public DateTime createdAt { get; set; } = DateTime.Now;
    }
}