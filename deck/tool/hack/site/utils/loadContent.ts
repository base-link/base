import fs from 'fs'

const cache: Record<string, string> = {}

export default function loadContent(path: string): string {
  if (cache[path]) {
    return cache[path]
  }

  const content = fs.readFileSync(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    path,
    'utf-8',
  )
  cache[path] = content
  return content
}
