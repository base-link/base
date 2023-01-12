import { Link, code } from '~'
import type { SiteProcessInputType } from '~'

export function assumeText(input: SiteProcessInputType): string {
  const text = code.resolveText(input)
  code.assertString(text)
  return text
}

export function bindText(
  input: SiteProcessInputType,
  callback: () => void,
): void {
  const dependencyTree = code.resolveTextDependencyTree(input)
  const leafDependencyList = code.getLeafDependencyList(dependencyTree)
  const canResolveDependencyTreeNow = code.canResolveDependencyTree(
    input,
    leafDependencyList,
  )

  if (canResolveDependencyTreeNow) {
    code.addTask(input.base, callback)
  } else {
    code.addDependencyTreeObserver(input, leafDependencyList)
  }
}

export function readLinkIndex(input: SiteProcessInputType): unknown {
  const nest = input.link.element

  if (nest.type === Link.Index) {
    const child = nest.nest[0]
    code.assertGenericLink(child)

    switch (child.type) {
      case Link.Tree:
        return code.readLinkTree(code.withLink(input, child))
      case Link.Path:
        return code.readLinkPath(code.withLink(input, child))
      case Link.Term:
        return code.readLinkTerm(code.withLink(input, child))
      default:
        throw new Error('Never')
    }
  }
}

export function readLinkPath(input: SiteProcessInputType): unknown {
  const nest = code.assumeLink(input, Link.Path)

  let i = 0

  const first = nest.segment[i++]
  code.assertGenericLink(first)
  const firstTerm = code.resolveTermString(code.withLink(input, first))

  code.assertString(firstTerm)
  let value = code.getEnvironmentProperty(input.environment, firstTerm)

  while (i < nest.segment.length) {
    const seg = nest.segment[i++]

    switch (seg?.type) {
      case Link.Index: {
        const index = code.readLinkIndex(code.withLink(input, seg))

        if (code.isRecord(value) && code.isString(index)) {
          value = code.getProperty(value, index)
        } else {
          value = undefined
        }
        break
      }
      case Link.Term: {
        const term = code.resolveTermString(code.withLink(input, seg))

        if (code.isRecord(value) && code.isString(term)) {
          value = code.getProperty(value, term)
        } else {
          value = undefined
        }
        break
      }
      default:
        throw new Error('Compiler error')
    }
  }

  return value
}

export function readLinkPlugin(input: SiteProcessInputType): unknown {
  const nest = input.link.element

  if (nest.type === Link.Plugin) {
    const child = nest.nest[0]
    code.assertGenericLink(child)

    switch (child.type) {
      case Link.Tree:
        return code.readLinkTree(code.withLink(input, child))
      case Link.Path:
        return code.readLinkPath(code.withLink(input, child))
      case Link.Term:
        return code.readLinkTerm(code.withLink(input, child))
      default:
        throw new Error('Never')
    }
  }
}

export function readLinkTerm(input: SiteProcessInputType): unknown {
  const term = code.resolveTermString(input)
  code.assertString(term)
  return code.getEnvironmentProperty(input.environment, term)
}

export function readLinkTree(input: SiteProcessInputType): unknown {
  const nest = input.link.element
  code.assertLink(nest, Link.Tree)
  throw new Error('TODO')
  return undefined
}

export function resolveText(
  input: SiteProcessInputType,
): string | undefined {
  const nest = input.link.element

  if (nest.type !== Link.Text) {
    return
  }

  const str: Array<unknown> = []

  nest.segment.forEach(seg => {
    switch (seg.type) {
      case Link.String:
        str.push(seg.value)
        break
      case Link.Plugin:
        const text = code.readLinkPlugin(code.withLink(input, seg, 0))
        str.push(text)
        break
      default:
        code.throwError(code.generateInvalidCompilerStateError())
    }
  })

  return str.join('')
}

export function textIsInterpolated(
  input: SiteProcessInputType,
  size: number = 1,
): boolean {
  const nest = input.link.element

  if (nest.type !== Link.Text) {
    return false
  }

  for (const seg of nest.segment) {
    if (seg.type === Link.Plugin) {
      return true
    }
  }

  return false
}
