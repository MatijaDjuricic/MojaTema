using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Dtos.User;
namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsersAsync();
        Task<User?> GetUserByIdAsync(int Id);
        Task<User?> UserLoginAsync(LoginDto loginDto);
    }
}