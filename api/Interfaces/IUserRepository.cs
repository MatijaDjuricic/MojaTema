using api.Models;
namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsersAsync(string cacheKey = "UsersList");
        Task<User?> GetUserByIdAsync(int Id, string cacheKey = "UserById");
    }
}