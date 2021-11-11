
const {
  LIST: NATIVE_ELEMENT_LIST,
  make: makeNativeElement,
  load: loadNativeElement,
  bind: bindNativeElement
} = require('../element')

module.exports = {
  make,
}

function make(view, home) {
  const fragment = []
  view.zone.forEach(zone => {
    if (zone.form === 'mesh') {
      if (NATIVE_ELEMENT_LIST.includes(zone.name)) {
        const mesh = makeNativeMesh(zone, view, home)
      }
    }
  })
  return fragment
}

function bind(fragment) {
  fragment.forEach(mesh => {
    const el = loadNativeElement(mesh.tagName)
    bindNativeElement(el, mesh)
  })
}

function makeNativeMesh(zone, view, home) {
  const mesh = {
    styles: {},
    staticStyles: [],
    attributes: {},
    handlers: {},
    className: `x${view.name}-${code}`
  }
  zone.bind.forEach(bind => {
    if (NATIVE_ELEMENT_STYLE_LIST[bind.name]) {
      if (isStaticBinding(bind)) {
        const value = getStaticBindingValue(bind)
        mesh.styles[bind.name] = value
        mesh.staticStyles.push(bind.name)
      } else {

      }
    } else if (bind.name === 'tag') {
      mesh.tagName = getBindingValue(bind)
    } else if (bind.name === 'children') {

    } else {
      const value = getBindingValue(bind)
      mesh.attributes[bind.name] = value
    }
  })
}
