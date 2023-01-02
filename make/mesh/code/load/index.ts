import {
  Link,
  LinkHint,
  Mesh,
  MeshFullType,
  MeshImportVariable_FullType,
  MeshImport_FullType,
  code,
} from '~'
import type { MeshInputType, MeshPartialType } from '~'

export * from './bear/index.js'
export * from './find/index.js'

export function finalize_codeCard_load_textNest(
  input: MeshInputType,
): void {
  const text = code.resolveText(input)

  code.assertString(text)

  const card = code.getProperty(input, 'card')

  code.assertMeshPartialType(card, Mesh.CodeModule)

  const path = code.resolveModulePath(input, text)

  const load = code.assumeInputObjectAsMeshPartialType(
    input,
    Mesh.Import,
  )

  load.children.push(
    code.createStringConstant('absolutePath', path),
  )
}

export function generateFullImport(
  start: MeshPartialType<Mesh.Import>,
): MeshFullType<Mesh.Import> {
  let absolutePath
  let variableList: Array<MeshImportVariable_FullType> = []
  let importList: Array<MeshImport_FullType> = []

  start.children.forEach(node => {
    if (!node.partial) {
      switch (node.like) {
        case Mesh.Constant:
          if (
            node.name === 'absolutePath' &&
            'like' in node.value &&
            node.value.like === Mesh.String
          ) {
            absolutePath = node.value.string
          }
          break
        case Mesh.Import:
          importList.push(node)
          break
        case Mesh.ImportVariable:
          variableList.push(node)
          break
        default:
          break
      }
    }
  })

  code.assertString(absolutePath)

  return {
    absolutePath,
    complete: false,
    import: importList,
    like: Mesh.Import,
    partial: false,
    variable: variableList,
  }
}

export function process_codeCard_load(
  input: MeshInputType,
): void {
  const load: MeshPartialType<Mesh.Import> = {
    children: [],
    like: Mesh.Import,
    partial: true,
  }

  const loader = code.assumeInputObjectAsMeshPartialType<
    Mesh.CodeModule | Mesh.Import
  >(input, [Mesh.CodeModule, Mesh.Import])

  loader.children.push(load)
  const childInput = code.extendWithObjectScope(input, load)

  code
    .assumeLinkType(input, Link.Tree)
    .nest.forEach((nest, index) => {
      process_codeCard_load_nestedChildren(
        code.extendWithNestScope(childInput, {
          index,
          nest,
        }),
      )
    })

  if (code.childrenAreComplete(load)) {
    code.replaceMeshChild<
      Mesh.CodeModule | Mesh.Import,
      MeshPartialType<Mesh.Import>,
      MeshFullType<Mesh.Import>
    >(
      childInput,
      [Mesh.CodeModule, Mesh.Import],
      load,
      code.generateFullImport(load),
    )
  } else {
  }
}

export function process_codeCard_load_nestedChildren(
  input: MeshInputType,
) {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticText: {
      const index = code.assumeNestIndex(input)
      if (index !== 0) {
        throw new Error('Oops')
      } else {
        code.finalize_codeCard_load_textNest(input)
      }
      break
    }

    case LinkHint.StaticTerm: {
      const term = code.resolveStaticTermFromNest(input)
      switch (term) {
        case 'find':
        case 'take':
          code.process_codeCard_load_find(input)
          break
        case 'load':
          code.process_codeCard_load(input)
          break
        case 'bear':
          code.process_codeCard_load_bear(input)
          break
        default:
          code.throwError(code.generateUnknownTermError(input))
      }
      break
    }

    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}
