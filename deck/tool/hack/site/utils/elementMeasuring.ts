let measurer: HTMLSpanElement

export function addToMeasurer(el: Node) {
  initializeMeasurer()

  if (!measurer) {
    return
  }

  measurer.appendChild(el)
}

export function getMeasurerWidth() {
  initializeMeasurer()

  return measurer.offsetWidth
}

export function initializeMeasurer() {
  if (measurer) {
    return
  }

  measurer = document.createElement('span')
  measurer.setAttribute('id', 'measurer')

  measurer.style.position = 'absolute'
  measurer.style.height = 'auto'
  measurer.style.width = 'auto'
  measurer.style.whiteSpace = 'nowrap'
  document.body.appendChild(measurer)
}

type SetMeasurerFontPropsType = {
  family?: string
  size?: number | string
}

export function removeFromMeasurer(el: Node) {
  if (!measurer) {
    return
  }

  el.parentNode?.removeChild(el)
}

export function setMeasurerFont({
  family,
  size,
}: SetMeasurerFontPropsType) {
  if (!measurer) {
    return
  }

  if (family) {
    measurer.style.fontFamily = family
  }

  if (size) {
    measurer.style.fontSize =
      typeof size === 'number' ? `${size}px` : size
  }
}

export function setMeasurerText(text: string) {
  initializeMeasurer()

  if (!measurer) {
    return
  }

  measurer.innerText = text
}
