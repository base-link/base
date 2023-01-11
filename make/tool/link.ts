import {
  LINK_TYPE,
  Link,
  LinkTreeType,
  LinkType,
  SiteLinkType,
  SiteProcessInputType,
  code,
} from '~'

export function assertGenericLink(
  object: unknown,
  name?: string,
): asserts object is LinkType<Link> {
  if (!code.isGenericLink(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('link', name))
  }
}

export function assertLink<T extends Link>(
  object: unknown,
  type: T,
  name?: string,
): asserts object is LinkType<T> {
  if (!code.isLink(object, type)) {
    code.throwError(code.generateIncorrectlyTypedVariable('link', name))
  }
}

export function assumeLink<T extends Link>(
  input: SiteProcessInputType,
  type: T,
  name?: string,
): LinkType<T> {
  const nest = input.link.element
  code.assertLink(nest, type, name)
  return nest
}

export function createLink(
  input: SiteProcessInputType,
  link: LinkTreeType,
  index?: number,
): SiteLinkType {
  return {
    element: link,
    index,
    parent: input.link,
  }
}

export function createTopLink(
  link: LinkTreeType,
  index?: number,
): SiteLinkType {
  return {
    element: link,
    index,
  }
}

export function isGenericLink(
  object: unknown,
): object is LinkType<Link> {
  return (
    code.isObjectWithType(object) &&
    LINK_TYPE.includes((object as LinkType<Link>).type)
  )
}

export function isLink<T extends Link>(
  object: unknown,
  type: T,
): object is LinkType<T> {
  return (
    code.isObjectWithType(object) &&
    (object as LinkType<T>).type === type
  )
}
