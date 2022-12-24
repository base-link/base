import {
  InitialMeshFuseType,
  Mesh,
  Nest,
  NestInputType,
  api,
} from '~'

export function process_codeCard_fuse(
  input: NestInputType,
): void {
  const fuse: InitialMeshFuseType = {
    bind: [],
    like: Mesh.Fuse,
  }

  const card = api.getProperty(input, 'card')
  api.assertMesh(card, Mesh.CodeCard)

  input.nest.nest.forEach((nest, index) => {
    process_codeCard_fuse_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_fuse_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticText:
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}
