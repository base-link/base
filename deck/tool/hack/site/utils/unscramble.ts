export type UnscrambledTermBySizeType = Record<
  string,
  Record<string, boolean>
>

export type UnscrambledTermMapType = Record<
  string,
  Record<string, boolean>
>

export type UnscrambledTermTrieType = Record<string, Array<string>>

export function unfoldUnscrambled(
  term: string,
  map: UnscrambledTermMapType,
  trie: UnscrambledTermTrieType,
) {
  const symbols = [...term]
  const bySize: UnscrambledTermBySizeType = {}
  const start = map[symbols.sort().join('')]
  const queue: Array<string> = []
  const traversed: Record<string, boolean> = {}

  let size = symbols.length

  bySize[size] = {}
  bySize[size][term] = true

  for (const b in start) {
    queue.push(b)
  }

  while (queue.length) {
    const sortedTerm = queue.shift() ?? ''
    if (traversed[sortedTerm]) {
      continue
    }

    traversed[sortedTerm] = true

    const matchedTerms = trie[sortedTerm] ?? []

    console.log(matchedTerms)

    matchedTerms.forEach(term => {
      const symbols = [...term]
      const size = symbols.length
      bySize[size] ??= {}
      bySize[size][term] = true

      const sortedInputTerm = symbols.sort().join('')
      const next = map[sortedInputTerm]

      for (const b in next) {
        queue.push(b)
      }
    })
  }

  return bySize
}
