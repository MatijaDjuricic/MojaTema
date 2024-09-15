using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Ucionica")]
    public class ClassRoom
    {
        [Column("id_ucionice")]
        public int Id { get; set; }
        [Column("broj_ucionice")]
        public int classRoomNumber { get; set; }
        [Column("kapacitet")]
        public int Capacity { get; set; }
    }
}