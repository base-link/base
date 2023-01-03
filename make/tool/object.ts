import {
  Base,
  Link,
  LinkTreeType,
  Mesh,
  MeshFullType,
  MeshModuleBaseType,
  MeshPartialChildrenContainerType,
  Mesh_FullTypeMixin,
  Mesh_PartialTypeMixin,
  SiteBranchType,
  SiteStepScopeType,
  code,
} from '~'
import type { MeshInputType } from '~'

export type MeshParseType = {
  directory: string
  link: LinkTreeType
  path: string
  text: string
  textByLine: Array<string>
}

export function childrenAreComplete({
  children,
}: {
  children: Array<Mesh_PartialTypeMixin | Mesh_FullTypeMixin>
}): boolean {
  return children.filter(x => x.partial).length === 0
}

export function createBranch(
  element: Record<string, unknown>,
  parent?: SiteBranchType,
): SiteBranchType {
  return {
    element,
    parent,
  }
}

export function createInput(
  module: MeshModuleBaseType,
  scope: SiteStepScopeType,
  bindings: Record<string, unknown>,
): MeshInputType {
  return {
    branch: code.createBranch(bindings),
    environment: code.createEnvironment(bindings),
    module,
    scope,
  }
}

export function createTerm(name: string): MeshFullType<Mesh.Term> {
  return {
    complete: true,
    dive: false,
    like: Mesh.Term,
    name,
    nest: [],
    partial: false,
  }
}

export function getNestedProperty(
  object: Record<string, unknown>,
  path: Array<string>,
): unknown {
  let value: unknown = object
  path.forEach(part => {
    if (code.isRecord(value)) {
      value = value[part]
    } else {
      value = undefined
    }
  })
  return value
}

export function getProperty(
  object: Record<string, unknown>,
  path: string,
): unknown {
  if (code.isRecord(object) && path in object) {
    return object[path]
  }
}

export function loadLinkModule(
  base: Base,
  path: string,
): MeshParseType {
  const text = code.readTextFile(base, path)
  const data = code.parseLinkText({ path, text })
  const directory = code.getLinkHost(path)
  return {
    directory,
    ...data,
  }
}

export function processNestedChildren(
  input: MeshInputType,
  nest: LinkTreeType,
  cb: (input: MeshInputType) => void,
): void {
  nest.nest.forEach((nest, index) => {
    cb(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function replaceIfComplete(
  input: MeshInputType,
  child: MeshPartialChildrenContainerType,
  cb: () => void,
): void {
  if (code.childrenAreComplete(child)) {
    code.potentiallyReplaceWithFullNode(input, cb)
  }
}

export function replaceSeed<T extends MeshModuleBaseType>(
  input: MeshInputType,
  replacement: T,
): void {
  input.module = replacement
  input.module.base.card(input.module.path).bind(replacement)
}

export function resolveHashtagAsNumber(
  input: MeshInputType,
): number | undefined {
  let hashtag = code.assumeLinkType(input, Link.Hashtag)

  switch (hashtag.system) {
    case 'b':
      return parseInt(hashtag.code, 2)
    case 'x':
      return parseInt(hashtag.code, 16)
    case 'o':
      return parseInt(hashtag.code, 8)
    case 'h':
      return parseInt(hashtag.code, 16)
    case 'd':
      return parseInt(hashtag.code, 10)
    case 's':
      return parseInt(hashtag.code, 60)
    case 't':
      return parseInt(hashtag.code, 12)
    default:
      // this is caught earlier
      code.throwError(code.generateInvalidCompilerStateError())
  }
}

export function withBranch(
  input: MeshInputType,
  element: Record<string, unknown>,
): MeshInputType {
  return {
    ...input,
    branch: code.createBranch(element, input.branch),
  }
}

export function withEnvironment(
  input: MeshInputType,
  bindings: Record<string, unknown>,
): MeshInputType {
  return {
    ...input,
    environment: code.createEnvironment(bindings, input.environment),
  }
}

export function withScope(
  input: MeshInputType,
  scope: SiteStepScopeType,
): MeshInputType {
  return {
    ...input,
    scope,
  }
}
