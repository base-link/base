export default function getLargestLetters(
  digitsString: string,
): Array<number> {
  const digits = [...digitsString]
  const last = []
  const final = []
  for (const digit of digits) {
    const value = parseInt(digit, 10)
    if (last.length === 0) {
      last.push(digit)
    } else if (last.join('').match(/^0+$/)) {
      last.push(digit)
    } else if (last[0] === '1') {
      last.push(digit)
      final.push(parseInt(last.join(''), 10))
      last.length = 0
    } else if (last[0] === '2' && value <= 6) {
      last.push(digit)
      final.push(parseInt(last.join(''), 10))
      last.length = 0
    } else {
      // it equals 1, but greater than 2
      final.push(parseInt(last.join(''), 10))
      last.length = 0
      last.push(digit)
    }
  }
  if (last.length) {
    final.push(parseInt(last.join(''), 10))
  }
  return final.filter(x => x)
}
