
module.exports = make

function make(hack) {
  let node = { name: 'base', link: [] }
  let child
  // let base = node
  let stack = [node]
  for (let token of hack) {
    node = stack[stack.length - 1]
    switch (token.form) {
      case `base-arch`:
        child = node.link[node.link.length - 1]
        stack.push(child)
        break
      case `head-arch`:
        stack.pop()
        break
      case `base-text`:
        child = {
          form: `text`,
          link: []
        }
        node.link.push(child)
        stack.push(child)
        break
      case `head-text`:
        stack.pop()
        break
      case `base-term`:
        child = {
          form: `term`,
          link: []
        }
        node.link.push(child)
        stack.push(child)
        break
      case `head-term`:
        stack.pop()
        break
      case `base-read`:
        child = {
          form: `read`,
          link: []
        }
        let childNode = node.link[node.link.length - 1]
        childNode.link.push(child)
        stack.push(child)
        break
      case `head-read`:
        stack.pop()
        break
      case `text`:
        node.link.push({
          form: `cord`,
          text: token.text
        })
        break
      case `slot`:
        break
      case `mark`:
        child = {
          form: `mark`,
          mark: parseInt(token.text, 10)
        }
        node.link.push(child)
        break
      case `code`:
        token.text.match(/#(\w)(\w+)/)
        let form = RegExp.$1
        let val = RegExp.$2
        if (form !== 'u') throw new Error(form)
        child = {
          form: 'code',
          code: String.fromCharCode(parseInt(val, 16))
        }
        node.link.push(child)
        break
      case `mark-line`:
        child = {
          form: `mark-line`,
          fill: parseFloat(token.text)
        }
        node.link.push(child)
        break
      case `name`:
        child = {
          form: `term`,
          name: token.text,
          link: []
        }
        node.link.push(child)
        break
    }
  }
  return stack.shift().link[0]
}
