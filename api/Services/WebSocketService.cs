using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
namespace api.Services
{
    public class WebSocketService : Hub
    {
        private static readonly Dictionary<string, List<string>> roomConnections = new Dictionary<string, List<string>>();
        public async Task SendMessage(string roomName, string id, string username, string message) {
            if (!roomConnections.ContainsKey(roomName)) {
                roomConnections[roomName] = new List<string>();
            }
            var connectionsInRoom = roomConnections[roomName];
            foreach (var connectionId in connectionsInRoom) {
                await Clients.Client(connectionId).SendAsync("ReceiveMessage", id, username, message);
            }
        }
        public async Task JoinRoom(string roomName) {
            if (!roomConnections.ContainsKey(roomName)) {
                roomConnections[roomName] = new List<string>();
            }
            var connectionId = Context.ConnectionId;
            roomConnections[roomName].Add(connectionId);
            await Clients.Caller.SendAsync("JoinRoom", roomName);
        }
        public async Task LeaveRoom(string roomName) {
            if (roomConnections.ContainsKey(roomName)) {
                var connectionId = Context.ConnectionId;
                roomConnections[roomName].Remove(connectionId);
                await Clients.Caller.SendAsync("LeaveRoom", roomName);
            }
        }
        #pragma warning disable CS8765
        public override Task OnDisconnectedAsync(Exception exception) {
            var connectionId = Context.ConnectionId;
            foreach (var room in roomConnections.Values) {
                room.Remove(connectionId);
            }
            return base.OnDisconnectedAsync(exception);
        }
        #pragma warning restore CS8765
    }
}