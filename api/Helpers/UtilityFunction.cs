using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
namespace api.Helpers
{
    public class UtilityFunction
    {
        private readonly DataContext context;
        public UtilityFunction(DataContext context) {
            this.context = context;
        }
        public string getUsernameById(int? id) {
            if (id == null) return "";
            var user = context.Users.Where(u => u.user_id == id).FirstOrDefault();
            if (user == null) return "";
            return $"{user.first_name} {user.last_name}";
        }
        public string getMentorNameById(int id) {
            var mentor = context.Mentors.Where(u => u.mentor_id == id).FirstOrDefault();
            if (mentor == null) return "";
            return $"{mentor.first_name} {mentor.last_name}";
        }
        public string getSubjectTitleById(int id) {
            var subject = context.Subjects.Where(u => u.subject_id == id).FirstOrDefault();
            if (subject == null) return "";
            return subject.title;
        }
    }
}