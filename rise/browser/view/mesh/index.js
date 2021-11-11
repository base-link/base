
const {
  LIST: NATIVE_ELEMENT_LIST,
  STYLE_LIST: NATIVE_ELEMENT_STYLE_LIST,
  make: makeNativeElement,
  load: loadNativeElement,
  bind: bindNativeElement
} = require('../element')

const STYLE_MAP = {
  fill: 'background-color',
  'text-fill': 'color',
}

module.exports = {
  make,
  bind,
  draw,
}

function draw(frag) {
  frag.forEach(mesh => {
    document.body.appendChild(mesh.nativeElement);
  })
}

function make(view, home) {
  const fragment = []
  view.zone.forEach(zone => {
    if (zone.form === 'mesh') {
      if (NATIVE_ELEMENT_LIST.includes(zone.name)) {
        const mesh = makeNativeMesh(zone, view, home)
        fragment.push(mesh)
      }
    }
  })
  return fragment
}

function bind(fragment, base) {
  fragment.forEach(mesh => {
    let stack = [{ node: mesh }]
    while (stack.length) {
      const { node, parent } = stack.shift()
      const el = node.name === 'text'
        ? document.createTextNode(node.attributes.text)
        : loadNativeElement(node.tagName, base)
      if (node.name !== 'text') {
        bindNativeElement(el, node)
      }
      if (parent) {
        parent.nativeElement.appendChild(el)
      }
      if (node.children) {
        node.children.forEach(childMesh => {
          stack.push({ node: childMesh, parent: node })
        })
      }
    }
  })
}

function makeNativeMesh(zone, view, home) {
  const mesh = {
    form: 'mesh',
    name: zone.name,
    tagName: zone.name,
    styles: {},
    staticStyles: [],
    attributes: {},
    handlers: [],
    className: `x${view.name}`
  }

  zone.bind.forEach(bind => {
    const name = STYLE_MAP[bind.name] || bind.name
    if (NATIVE_ELEMENT_STYLE_LIST[name]) {
      if (isStaticBinding(bind.sift)) {
        const value = getBindingValue(bind.sift)
        mesh.styles[name] = value
        mesh.staticStyles.push(name)
      } else {

      }
    } else if (name === 'tag') {
      mesh.tagName = getBindingValue(bind.sift)
    } else if (name === 'text') {
      mesh.children = [
        {
          form: 'mesh',
          name: 'text',
          attributes: {
            text: getBindingValue(bind.sift)
          }
        }
      ]
    } else if (name === 'children') {

    } else {
      const value = getBindingValue(bind.sift)
      mesh.attributes[name] = value
    }
  })

  zone.hook.forEach(hook => {
    mesh.handlers.push({
      type: hook.name,
      handle: (e) => console.log(e)
    })
  })

  return mesh
}

function getBindingValue(sift, formKnit = {}) {
  switch (sift.form) {
    case `sift-text`: return sift.text
    case `text`: return sift.text
    case `size`: return sift.size
    case `sift-mark`: return sift.size
    case `link`: return getLink(sift.nest, formKnit)
  }
}

function isStaticBinding(sift) {
  switch (sift.form) {
    case `sift-text`:
    case `text`:
    case `size`:
    case `sift-mark`:
      return true
    case `link`:
      return false
    default:
      throw JSON.stringify(sift)
  }
}
