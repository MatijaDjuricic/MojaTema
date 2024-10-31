using Microsoft.EntityFrameworkCore;
using api.Models;
namespace api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<Exam> Exams { get; set; }
        public DbSet<SelectionGraduationPaper> SelectionGraduationPapers { get; set; }
        public DbSet<Commission> Commissions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<DefenseGraduationPaper> DefenseGraduationPapers { get; set; }
        public DbSet<Department> Drpartments { get; set; }
        public DbSet<Subject> Subject { get; set; }
        public DbSet<ProfessorSubject> ProfessorSubjects { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);
            builder.Entity<Topic>().HasOne(t => t.User).WithMany().HasForeignKey(t => t.professorId);
            builder.Entity<Topic>().HasOne(t => t.Student).WithMany().HasForeignKey(t => t.studentId);
            builder.Entity<Topic>().HasOne(t => t.Subject).WithMany().HasForeignKey(t => t.subjectId);
            builder.Entity<Student>().HasOne(t => t.User).WithMany().HasForeignKey(t => t.userId);
        }
    }
}