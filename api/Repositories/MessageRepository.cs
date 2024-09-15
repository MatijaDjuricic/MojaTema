using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Message;
using api.Enums;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace api.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext context;
        public MessageRepository(DataContext context) => this.context = context;
        
        public async Task<ReceiverUserDto?> GetReceiverUserByIdAsync(int Id) {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == Id);
            if (user == null) return null;
            return new ReceiverUserDto {
                ReceiverId = user.Id,
                FirstName = user.firstName,
                LastName = user.lastName,
                Email = user.Email,
                RoleStatus = user.roleStatus
            };
        }
        public async Task<List<ChatsUserDto>?> GetChatsUserByIdAsync(int Id) {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == Id);
            if (user == null) return null;
            var topics = await context.Topics.Include(t => t.User)
            .Include(t => t.Student)
            .ThenInclude(s => s != null ? s.User : null)
            .Include(t => t.Subject)
            .Where(t => t.professorId == Id || (t.Student != null && t.Student.User.Id == Id)).ToListAsync();
            if (topics == null || !topics.Any()) return null;
            if (user.roleStatus == (int)RoleEnum.UCENIK) {
                var chatsUser = topics.Select(t => new ChatsUserDto {
                    Id = t.professorId,
                    FirstName = t.User.firstName,
                    LastName = t.User.lastName,
                    Email = t.User.Email,
                    RoleStatus = t.User.roleStatus
                }).ToList();
                return chatsUser;
            } else if (user.roleStatus == (int)RoleEnum.PROFESOR) {
                var chatsUser = topics.Select(t => new ChatsUserDto {
                    Id = t.Student != null ? t.Student.User.Id : -1,
                    FirstName = t.Student?.User.firstName,
                    LastName = t.Student?.User.lastName,
                    Email = t.Student?.User.Email,
                    RoleStatus = t.Student != null ? t.Student.User.roleStatus : -1
                }).ToList();
                return chatsUser;
            }
            return null;
        }
    }
}