import humanFormat from 'human-format'

export function parseBytes(str: string): number {
  return humanFormat.parse(str)
}
