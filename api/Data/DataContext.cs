using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;
namespace api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<User> Users { get; set; }
        public DbSet<Mentor> Mentors { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<ReportedTopic> ReportedTopics { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>(x => x.HasKey(y => new { y.user_id }));
            builder.Entity<Subject>(x => x.HasKey(y => new { y.subject_id }));
            builder.Entity<Mentor>(x => x.HasKey(y => new { y.mentor_id }));
            builder.Entity<Topic>(x => x.HasKey(y => new { y.topic_id }));
            builder.Entity<ReportedTopic>().HasKey(x => new { x.user_id, x.topic_id });
        }
    }
}