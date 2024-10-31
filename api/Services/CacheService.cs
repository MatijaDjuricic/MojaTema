using api.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
namespace api.Services
{
    public class CacheService : ICacheService
    {
        private readonly IDistributedCache cache;
        public CacheService(IDistributedCache cache) => this.cache = cache;
        public async Task SetCache<T>(T items, string cacheKey, int timeSpan) where T : class {
            var options = new DistributedCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromMinutes(timeSpan));
            await cache.SetStringAsync(cacheKey, Helpers.Helper.JsonToString(items), options);
        }
        public async Task<T?> VerifyCacheSingle<T>(string cacheKey) where T : class {
            var cachedItems = await cache.GetStringAsync(cacheKey);
            if (string.IsNullOrEmpty(cachedItems)) return null;
            return Helpers.Helper.JsonToGenricType<T>(cachedItems);
        }
        public async Task<List<T>?> VerifyCacheList<T>(string cacheKey) where T : class {
            var cachedItems = await cache.GetStringAsync(cacheKey);
            if (string.IsNullOrEmpty(cachedItems)) return null;   
            return Helpers.Helper.JsonToGenricType<List<T>>(cachedItems);
        }
    }
}