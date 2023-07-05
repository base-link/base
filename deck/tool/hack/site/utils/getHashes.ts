import { HashType } from './types'

export default async function getHashes(
  string: string,
): Promise<Array<HashType>> {
  const crypto = (await import('node:crypto')).default
  return crypto
    .getHashes()
    .filter(
      x =>
        !x.endsWith('Encryption') &&
        !x.match('v1_5') &&
        !x.startsWith('RSA') &&
        !x.endsWith('RSA'),
    )
    .map(algorithm => ({
      algorithm,
      value: crypto.createHash(algorithm).update(string).digest('hex'),
    }))
}
