const letters = [
  'h',
  'z',
  'd',
  's',
  'l',
  'k',
  'v',
  'x',
  'f',
  'n',
  'b',
  'c',
  'm',
  'r',
  't',
  'w',
]

export function toToneNumber(num: number): string {
  return (
    'a' +
    String(num)
      .split('')
      .map(n => letters[parseInt(n, 10)])
      .join('')
  )
}
