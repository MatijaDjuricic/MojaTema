using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsersAsync();
        Task<User?> UserLoginAsync(string password);
        Task<Mentor?> MentorLoginAsync(string password);
    }
}