using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace api.Dtos.Message
{
    public class ChatsUserDto
    {
        
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public int RoleStatus { get; set; }
    }
}