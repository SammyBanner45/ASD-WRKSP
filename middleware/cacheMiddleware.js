const cache = new Map();
const TTL_MS = 60 * 1000;

function clearCache() {
    cache.clear();
}

function cacheMiddleware(req, res, next) {
    if (req.method !== 'GET') {
        return next();
    }

    const key = req.originalUrl || req.url;
    const cachedEntry = cache.get(key);
    const now = Date.now();

    if (cachedEntry && (now - cachedEntry.createdAt < TTL_MS)) {
        res.setHeader('X-Cache', 'HIT');
        return res.json(cachedEntry.data);
    }

    res.setHeader('X-Cache', 'MISS');

    const originalJson = res.json.bind(res);
    res.json = function (body) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.set(key, {
                data: body,
                createdAt: Date.now()
            });
        }
        return originalJson(body);
    };

    next();
}

function invalidateCacheMiddleware(req, res, next) {
    const originalJson = res.json.bind(res);
    res.json = function (body) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            clearCache();
        }
        return originalJson(body);
    };
    next();
}

module.exports = {
    cacheMiddleware,
    invalidateCacheMiddleware,
    clearCache
};
