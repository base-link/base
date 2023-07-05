const LOADED_FONT: Record<string, boolean> = {}

export async function loadDynamicFont(
  name: string,
  path: string | Array<string>,
) {
  let [p, n] = Array.isArray(path)
    ? [path, name.split(/\s*,\s*/)]
    : [[path], [name]]

  let i = 0
  const promises: Array<Promise<FontFace>> = []
  while (i < n.length) {
    const name = n[i]

    if (LOADED_FONT[name]) {
      i++
      continue
    }

    const path = p[i]

    const font = new FontFace(name, `url('${path}')`)
    promises.push(
      new Promise((res, rej) => font.load().then(res).catch(rej)),
    )

    i++
  }

  if (promises.length) {
    let fonts
    try {
      fonts = await Promise.all(promises)
    } catch (e) {
      console.log(e)
      return
    }

    fonts.forEach(font => {
      document.fonts.add(font)

      LOADED_FONT[font.family] = true
    })
  }

  LOADED_FONT[name] = true
}
