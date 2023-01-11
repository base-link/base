import { Color, Link, LinkHint, Mesh, YellowExportType, code } from '~'
import type { SiteProcessInputType } from '~'

export * from './hide/index.js'

export function process_codeCard_bear(
  input: SiteProcessInputType,
): void {
  const red = code.createRed(input, code.createRedGather(input, 'bear'))
  const blue = code.pushBlue(input, 'exports', {
    hides: [],
    type: Mesh.Export,
  })
  const colorInput = code.withColors(input, { blue, red })
  const nest = code.assumeNest(colorInput)

  nest.forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.process_codeCard_bear_nestedChildren(
        code.withEnvironment(colorInput, {
          index,
          nest,
        }),
      )
    })
  })

  code.addTask(() => {
    // potentiallyReplaceWithSemiStaticMesh
    code.tryUpgradingToYellow(redInput, () =>
      code.upgrade_yellow_codeCard_bear(childInput),
    )
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
  const nest = code.assumeLink(input)
  code.assertLink(nest, Link.Text)
  const red = code.createRed(
    input,
    code.createRedGather(input, 'absolute-path', [nest]),
  )

  code.addTask(() => {
    code.bindText()
  })
}

export function process_codeCard_bear_nestedChildren_text(
  input: SiteProcessInputType,
): void {
  const text = code.resolveText(input)
  code.assertString(text)

  const path = code.resolveModulePath(input, text)

  code.createRed(
    input,
    code.createRedGather(input, 'absolute-path', [
      code.createBlueString(path),
    ]),
  )

  code.attachBlue(input, 'absolutePath', {
    type: Mesh.String,
    value: path,
  })
}

export function upgrade_yellow_codeCard_bear(
  input: SiteProcessInputType,
): YellowExportType {
  const absolutePath = code.findRedPlaceholder(input, 'absolute-path')
  code.assertMeshText(absolutePath)

  const hides = code.filterPlaceholders(input, 'hide')
  code.assertMeshArray(hides, Mesh.HideExportVariable)

  const yellow: YellowExportType = {
    absolutePath,
    color: Color.Yellow,
    hides,
    type: Mesh.Export,
  }

  return yellow
}
