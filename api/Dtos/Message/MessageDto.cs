using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace api.Dtos.Message
{
    public class MessageDto
    {
        public string? ReceiverId { get; set; }
        public string? UserIdentifier { get; set; }
        public string? Message { get; set; }
    }
}