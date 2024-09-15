using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Razred")]
    public class Class
    {
        [Column("id_razreda")]
        public int Id { get; set; }
        [Column("razred")]
        public string className { get; set; } = null!;
    }
}