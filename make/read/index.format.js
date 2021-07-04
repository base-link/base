
function format(arr) {
  let indent = []
  let out = []
  arr.forEach(token => {
    switch (token.form) {
      case `base-arch`:
        out.push(`(\n`)
        indent.push('  ')
        break
      case `head-arch`:
        indent.pop()
        out.push(`\n${indent.join('')})`)
        break
      case `base-read`:
        out.push(`${indent.join('')}`)
        break
      case `head-read`:
        out.push(``)
        break
      case `base-term`:
        break
      case `head-term`:
        break
      case `text`:
        out.push(`${indent.join('')}'${token.text}'`)
        break
      case `slot`:
        out.push(`,\n`)
        break
      case `mark`:
      case `code`:
      case `mark-line`:
      case `name`:
        out.push(`${indent.join('')}${token.text}`)
        break
    }
  })
  // console.log(out.join(''))
  return out.join('')
}

module.exports = format
