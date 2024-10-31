using System.Text.Json;
namespace api.Helpers
{
    public static class Helper
    {
        public static string JsonToString<T>(T content) where T : class {
            return JsonSerializer.Serialize(content);
        }
        public static T? JsonToGenricType<T>(string content) where T : class {
            if (string.IsNullOrEmpty(content)) return null;
            return JsonSerializer.Deserialize<T>(content);
        }
    }
}