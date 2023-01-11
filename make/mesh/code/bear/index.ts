import { Color, Link, LinkHint, Mesh, YellowExportType, code } from '~'
import type { SiteProcessInputType } from '~'

export * from './hide/index.js'

export function process_codeCard_bear(
  input: SiteProcessInputType,
): void {
  const red = code.pushRed(input, code.createRedGather(input, 'bear'))
  const blue = code.pushBlue(input, 'exports', {
    hides: [],
    type: Mesh.Export,
  })
  const colorInput = code.withColors(input, { blue, red })
  const nest = code.assumeNest(colorInput)

  nest.forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.process_codeCard_bear_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function process_codeCard_bear_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticText: {
      code.process_codeCard_bear_nestedChildren_text(input)
      break
    }
    case LinkHint.DynamicText: {
      code.process_codeCard_bear_nestedChildren_dynamicText(input)
      break
    }
    case LinkHint.StaticTerm: {
      const term = code.resolveTermString(input)
      switch (term) {
        case 'hide':
          code.process_codeCard_bear_hide(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function process_codeCard_bear_nestedChildren_dynamicText(
  input: SiteProcessInputType,
): void {
  const nest = code.assumeLink(input, Link.Text)

  code.pushRed(
    input,
    code.createRedGather(input, 'absolute-path', [nest]),
  )

  const text = code.assumeText(input)
  const path = code.resolveModulePath(input, text)
  const string = code.createBlueString(path)

  code.attachBlue(input, 'absolutePath', string)

  code.addTask(input.base, () => {
    code.handle_codeCard(input.base, path)
  })
}

export function process_codeCard_bear_nestedChildren_text(
  input: SiteProcessInputType,
): void {
  const text = code.assumeText(input)
  const path = code.resolveModulePath(input, text)
  const string = code.createBlueString(path)

  code.pushRed(
    input,
    code.createRedGather(input, 'absolute-path', [string]),
  )

  code.attachBlue(input, 'absolutePath', string)

  code.addTask(input.base, () => {
    code.handle_codeCard(input.base, path)
  })
}
