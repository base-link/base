import {
  LexicalScope,
  LexicalScopeNestAddonType,
} from '~server/type'

export function resolveStaticTerm(
  scope: LexicalScope<LexicalScopeNestAddonType>,
): string | undefined {
  const nest = scope.data.nest

  if (nest.line.length > 1) {
    return
  }

  let line = nest.line[0]
  if (!line) {
    return
  }

  if (line.like !== 'term') {
    return
  }

  if (line.link.length !== 1) {
    return
  }

  let link = line.link[0]
  if (link && link.like === 'cord') {
    return link.cord
  }
}

export function termIsInterpolated(
  scope: LexicalScope<LexicalScopeNestAddonType>,
): boolean {}
