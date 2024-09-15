using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Ucenik")]
    public class Student
    {
        [Column("id_ucenik")]
        public int Id { get; set; }
        [Column("id_korisnik")]
        public int userId { get; set; }
        [Column("id_razred")]
        public int classId { get; set; }
        [Column("id_odeljenja")]
        public int departmentId { get; set; }
        [Column("status")]
        public string Status { get; set; } = null!;
        [Column("ocena_obavezni")]
        public int? gradeMandatory { get; set; }
        [Column("ocena_izborni")]
        public int? gradeOptional { get; set; }
        [Column("ocena_maturski")]
        public int? gradeGraduation { get; set; }
        public User User { get; set; } = null!;
    }
}