using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
namespace api.Helpers
{
    public static class Helper
    {
        public static string GetRoleName(int roleValue)
        {
            if (Enum.IsDefined(typeof(RoleEnum), roleValue))
            {
                RoleEnum roleEnum = (RoleEnum)roleValue;
                return roleEnum switch
                {
                    RoleEnum.SUPER_ADMINISTRATOR => "супер администратор",
                    RoleEnum.ADMINISTRATOR => "администратор",
                    RoleEnum.DIREKTOR => "директор",
                    RoleEnum.KOORDINATOR => "координатор",
                    RoleEnum.PROFESOR => "професор",
                    RoleEnum.MENTOR => "ментор",
                    RoleEnum.ODELJENSKI_STARESINA => "одењенски старешина",
                    RoleEnum.UCENIK => "ученик",
                    RoleEnum.PREDSEDNIK_KOMISIJE => "председник комисије",
                    RoleEnum.RUKOVODILAC_AKTIVA => "руководилац актива",
                    _ => roleEnum.ToString(),
                };
            }
            return "unknown";
        }
        public static string getTopicStatus(int roleValue) {
            if (Enum.IsDefined(typeof(TopicEnum), roleValue))
            {
                TopicEnum topicEnum = (TopicEnum)roleValue;
                return topicEnum switch
                {
                    TopicEnum.SLOBODNA => "слободна",
                    TopicEnum.NA_CEKANJU => "на чекању",
                    TopicEnum.REZERVISANA => "резервисана",
                    _ => topicEnum.ToString(),
                };
            }
            return "unknown";
        }
        public static string getStudentStatus(int roleValue) {
            if (Enum.IsDefined(typeof(StudentEnum), roleValue))
            {
                StudentEnum studentEnum = (StudentEnum)roleValue;
                return studentEnum switch
                {
                    StudentEnum.AKTIVAN => "активан",
                    StudentEnum.ARHIVIRAN => "архивиран",
                    _ => studentEnum.ToString(),
                };
            }
            return "unknown";
        }
        public static string getClassName(int roleValue) {
            if (Enum.IsDefined(typeof(ClassEnum), roleValue))
            {
                ClassEnum classEnum = (ClassEnum)roleValue;
                return classEnum switch
                {
                    ClassEnum.DRUSTVENO_JEZICKI => "друштвено-језички",
                    ClassEnum.PRIRODNO_MATEMATICKI => "природно-математички",
                    ClassEnum.UCENICI_SA_POSEBNIM_SPOSOBNOSTIMA_ZA_INFORMATIKU => "ученици са посебним способностима за информатику",
                    ClassEnum.UCENICI_SA_POSEBNIM_SPOSOBNOSTIMA_ZA_FIZIKU => "ученици са посебним способностима за физику",
                    _ => classEnum.ToString(),
                };
            }
            return "unknown";
        }
        public static string getGraduationPaperStatus(int roleValue) {
            if (Enum.IsDefined(typeof(SelectionGraduationPaperEnum), roleValue))
            {
                SelectionGraduationPaperEnum graduationPaperEnum = (SelectionGraduationPaperEnum)roleValue;
                return graduationPaperEnum switch
                {
                    SelectionGraduationPaperEnum.POSLAT => "послат",
                    SelectionGraduationPaperEnum.NA_PREGLEDANJU => "на прегледању",
                    SelectionGraduationPaperEnum.POTREBNO_KORIGOVANJE => "потребно кориговање",
                    SelectionGraduationPaperEnum.ODOBREN_ZA_STAMPU => "одорбен за штампу",
                    _ => graduationPaperEnum.ToString(),
                };
            }
            return "unknown";
        }
    }
}