using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace api.Dtos.User
{
    public class LoginDto
    {
        [Required]
        public string password { get; set; } = null!;
    }
}