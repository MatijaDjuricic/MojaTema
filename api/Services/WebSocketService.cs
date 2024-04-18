using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
namespace api.Services
{
    public class WebSocketService : Hub
    {
        public async Task SendMessage(string id, string user, String message, string created_at) {
            await Clients.All.SendAsync("ReceiveMessage", id, user, message, created_at);
        }
    }
}