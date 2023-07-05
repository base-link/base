import fs from 'fs'

const cache: Record<string, unknown> = {}

export default function loadJSON(path: string): unknown {
  if (cache[path]) {
    return cache[path]
  }

  const data = JSON.parse(fs.readFileSync(path, 'utf-8')) as unknown
  cache[path] = data
  return data
}
