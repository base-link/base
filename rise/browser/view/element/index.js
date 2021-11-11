
const LIST = [
  'div'
]

function removeFromParent(el) {
  el.parentNode.removeChild(el)
}

function load(base, tag) {
  return loadFromPool(base, tag) || make(tag)
}

function loadFromPool(base, tag) {
  return base.pool[tag].pop()
}

function kill(nativeElement) {
  let stack = [nativeElement]
  let els = []
  while (stack.length) {
    const el = stack.shift()
    el.parentNode.removeChild(el)
    node.handlers.forEach(({ type, handler }) => {
      el.removeEventListener(type, handler)
    })
    Object.keys(el.style).forEach(name => {
      el.style[name] = undefined;
    })
    el.attributes.forEach(attribute => {
      el.removeAttribute(attribute.name)
    })
    el.classList.remove(...el.classList);
    el.children.forEach(child => {
      stack.push(child)
    })
    els.push(el)
  }
  els.forEach(el => {
    // clear out any remaining text
    el.innerHTML = ''
    addNativeElementToPool(el)
  })
}

function addNativeElementToPool(el, store) {
  const pool = store.pool[el.tagName] = store.pool[el.tagName] || []
  if (pool.length < store.maxPoolSize) {
    pool.push(el)
  }
}

function make(tag) {
  return document.createElement(tag)
}

function bind(el, mesh) {
  for (const name in mesh.attributes) {
    const value = mesh.attributes[name]
    el.setAttribute(name, value)
  }
  for (const name in mesh.styles) {
    const value = mesh.styles[name]
    el.style[name] = value
  }
  el.classList.add(mesh.className)
  mesh.handlers.forEach(handler => {
    el.addEventListener(handler.name, handler.handle)
  })
  mesh.nativeElement = el
}

module.exports = {
  removeFromParent,
  kill,
  make,
  bind,
  load,
  LIST
}
