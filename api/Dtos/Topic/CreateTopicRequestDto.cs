namespace api.Dtos.Topic
{
    public class CreateTopicRequestDto
    {
        public string title { get; set; } = null!;
        public string description { get; set;} = null!;
        public int subjectId { get; set; }
        public int professorId { get; set;}
    }
}