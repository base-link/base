import _ from 'lodash'

export default function delineateNumberAdditionSequence(
  array: Array<number>,
) {
  const statements = []
  let input = array
  if (input.length === 1) {
    let childInput = String(input[0])
      .split('')
      .map(x => parseInt(x, 10))

    if (childInput.length === 1) {
      statements.push({
        adds: input.map(value => ({ value })),
        sum: input[0],
      })
      return statements
    } else {
      input = childInput
    }
  }

  while (input.length > 1) {
    const line = input
    const sum = _.sum(input)
    statements.push({ adds: line.map(value => ({ value })), sum })
    input = String(sum)
      .split('')
      .map(x => parseInt(x, 10))
  }

  return statements
}
