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
        public UserRepository(DataContext context) => this.context = context;
        public async Task<List<User>> GetUsersAsync() => await context.Users.ToListAsync();
        public async Task<User?> UserLoginAsync(string password) => await context.Users.FirstOrDefaultAsync(x => x.password == password);
        public async Task<Mentor?> MentorLoginAsync(string password) => await context.Mentors.FirstOrDefaultAsync(x => x.password == password);
    }
}