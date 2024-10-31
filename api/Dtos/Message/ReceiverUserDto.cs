namespace api.Dtos.Message
{
    public class ReceiverUserDto
    {
        public int ReceiverId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int RoleStatus { get; set; }
    }
}