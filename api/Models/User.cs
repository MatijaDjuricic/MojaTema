using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Ucenik")]
    public class User
    {
        [Column("ucenik_id")]
        public int user_id { get; set; }
        [Column("ime")]
        public string first_name { get; set; } = null!;
        [Column("prezime")]
        public string last_name { get; set; } = null!;
        [Column("kod")]
        public string password { get; set; } = null!;
        [Column("tema_id")]
        public int? topic_id { get; set; }
        [Column("odeljenje")]
        public int user_class { get; set; }
    }
}