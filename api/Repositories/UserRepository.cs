using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Interfaces;
using api.Models;
namespace api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext context;
        private readonly ICacheService cacheService;
        public UserRepository(DataContext context, ICacheService cacheService) {
            this.context = context;
            this.cacheService = cacheService;
        }
        public async Task<List<User>> GetUsersAsync(string cacheKey) {
            var cachedUsers = await cacheService.VerifyCacheList<User>(cacheKey);
            if (cachedUsers != null) return cachedUsers;
            var users = await context.Users.ToListAsync();
            await cacheService.SetCache(users, cacheKey);
            return users;
        }
        public async Task<User?> GetUserByIdAsync(int Id, string cacheKey) {
            var cachedUser = await cacheService.VerifyCacheSingle<User>(cacheKey);
            if (cachedUser != null) return cachedUser;
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == Id);
            if (user != null) await cacheService.SetCache(user, cacheKey);
            return user;
        }
    }
}