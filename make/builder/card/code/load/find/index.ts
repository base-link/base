import {
  APIInputType,
  InitialMeshLoadTakeType,
  InitialMeshLoadType,
  Mesh,
  MeshLoadType,
  MeshType,
  api,
} from '~'

export * from './bear'
export * from './save'

export type LoadFindInputType = {
  find: InitialMeshLoadTakeType
}

export type LoadInputType = {
  load: MeshLoadType | InitialMeshLoadType
}

export function assumeInputObjectAsMesh<T extends Mesh>(
  input: APIInputType,
  type: T,
  rank = 0,
): MeshType<T> {
  let objectScope = input.objectScope
  while (rank > 0 && objectScope.parent) {
    objectScope = objectScope.parent
    rank--
  }
  api.assertMesh(objectScope.data, type)
  return objectScope.data
}

export function extendWithObjectScope(
  input: APIInputType,
  data: Record<string, unknown>,
): APIInputType {
  return {
    ...input,
    objectScope: api.createScope(data, input.objectScope),
  }
}

export function process_codeCard_load_find(
  input: APIInputType,
): void {
  const find: InitialMeshLoadTakeType = {
    like: Mesh.LoadTake,
  }

  const load = api.assumeInputObjectAsMesh(input, Mesh.Load)
  load.take.push(find)

  const childInput = api.extendWithObjectScope(input, find)

  const nest = api.assumeNest(input)
  nest.nest.forEach((nest, index) => {
    api.process_codeCard_load_find_nestedChildren(
      api.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_load_find_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTermFromNest(input)
    api.assertString(term)
    const index = api.assumeNestIndex(input)

    if (index > 0) {
      switch (term) {
        case 'save':
          api.process_codeCard_load_find_save(input)
          break
        case 'bear':
          api.process_codeCard_load_find_bear(input)
          break
        default:
          api.throwError(api.generateUnknownTermError(input))
      }
    } else {
      const find = api.assumeInputObjectAsMesh(
        input,
        Mesh.LoadTake,
      )
      find.name = term
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}
