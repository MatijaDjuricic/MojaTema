using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Message;
namespace api.Interfaces
{
    public interface IMessageRepository
    {
        Task<ReceiverUserDto?> GetReceiverUserByIdAsync(int Id);
        Task<List<ChatsUserDto>?> GetChatsUserByIdAsync(int Id);
    }
}