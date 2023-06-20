
export function generateRedisKey(prefix: string, filter?: any): string {

  if (!filter) return prefix

  Object.keys(filter).map(key => {
    prefix += `:${key}:${filter[key]}`
  })

  return `${prefix}`
}
