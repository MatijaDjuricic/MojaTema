using api.Dtos.Message;
namespace api.Interfaces
{
    public interface IMessageRepository
    {
        Task<ReceiverUserDto?> GetReceiverUserByIdAsync(int Id);
        Task<List<ChatsUserDto>?> GetChatsUserByIdAsync(int Id);
    }
}