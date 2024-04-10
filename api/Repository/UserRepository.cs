using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
namespace api.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext context;
        public UserRepository(DataContext context) {
            this.context = context;
        }
        public async Task<List<User>> GetUsersAsync() {
           return await context.Users.ToListAsync();
        }
        public async Task<User?> UserLoginAsync(string password) {
            return await context.Users.FirstOrDefaultAsync(x => x.password == password);
        }
    }
}