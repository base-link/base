
function load(home, view) {
  const { staticStyles, dynamicStyles, handlers, otherAttributes } = parseView(view)
  const className = createCSSSelectorsFromStyles(home, view.name, staticStyles)
  home.view[view.id] = {
    className,
    dynamicStyles,
    handlers,
    otherAttributes,
  }
}

function getNode(home, view) {
  return getNodeFromPool(home, view) || make(home, view)
}

function createMesh(home, mesh) {
  if (nativeElementNameMap[mesh.name]) {
    return createNativeElement(home, mesh)
  } else {
    return createComponentElement(home, mesh)
  }
}

function createNativeElement(home, mesh) {
  // mesh.home (scope)
}

function makeNativeElement(home, view) {
  const scope = {}
  const el = document.createElement(view.tag)
  const { className, dynamicStyles, handlers, otherAttributes } = home.view[view.id]
  el.classList.add(className)
  otherAttributes.forEach(attribute => {
    el.setAttribute(attribute.name, attribute.get())
  })
  scope.nativeElement = el
}

function parseView(view) {

}

function update(view) {

}
