type GetMelodiesPropsType = {
  beats: number
  notes: number
}

export default function getMelodies({
  beats,
  notes,
}: GetMelodiesPropsType): Array<Array<number>> {
  // Generator (could also be a normal function that pushes to a non-local array)
  function* recur(
    melody: Array<number>,
    reusedCount: number,
  ): IterableIterator<Array<number>> {
    if (melody.length === beats) {
      if (reusedCount === 0 || reusedCount * 2 >= beats) {
        yield melody
      }
      return
    }
    let least = melody[reusedCount] ?? -1
    if (melody.length) {
      yield* recur(melody.concat(least), reusedCount + 1)
    }
    for (let note = least + 1; note < notes; note++) {
      yield* recur(melody.concat(note), note === melody[0] ? 1 : 0)
    }
  }

  return Array.from(recur([], 0))
}
