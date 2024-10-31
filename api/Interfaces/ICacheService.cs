namespace api.Interfaces
{
    public interface ICacheService
    {
        Task SetCache<T>(T items, string cacheKey, int timeSpan = 5) where T : class;
        Task<T?> VerifyCacheSingle<T>(string cacheKey) where T : class;
        Task<List<T>?> VerifyCacheList<T>(string cacheKey) where T : class;
    }
}