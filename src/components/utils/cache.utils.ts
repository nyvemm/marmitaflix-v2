import NodeCache from 'node-cache'

const cache = new NodeCache()

export function cacheWrapper<T extends (...args: any[]) => Promise<any>>(fn: T, ttl = 60) {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const key = JSON.stringify(args)
    const cachedResult = cache.get(key)

    if (cachedResult) {
      console.log('Cache hit')
      return cachedResult as ReturnType<T>
    }

    console.log('Cache miss')
    const result = await fn(...args)
    cache.set(key, result, ttl)

    return result
  }
}
