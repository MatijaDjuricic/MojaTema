using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using api.Dtos.User;
using Microsoft.EntityFrameworkCore;
namespace api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext context;
        public UserRepository(DataContext context) => this.context = context;
        public async Task<List<User>> GetUsersAsync() => await context.Users.ToListAsync();
        public async Task<User?> GetUserByIdAsync(int Id) => await context.Users.FirstOrDefaultAsync(x => x.Id == Id);
        public async Task<User?> UserLoginAsync(LoginDto loginDto) {
            return await context.Users.FirstOrDefaultAsync(x => x.Password == loginDto.Password && x.Email == loginDto.Email);
        }
    }
}