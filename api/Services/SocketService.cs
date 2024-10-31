using Microsoft.AspNetCore.SignalR;
using api.Dtos.Message;
namespace api.Services
{
    public class SocketService : Hub
    {
        public async Task SendMessage(string receiverId, string message) {
            await Clients.User(receiverId).SendAsync("ReceiveMessage", new MessageDto
            {
                ReceiverId = receiverId,
                UserIdentifier = Context.UserIdentifier,
                Message = message
            });
        }
        public override async Task OnConnectedAsync() => await base.OnConnectedAsync();
    }
}