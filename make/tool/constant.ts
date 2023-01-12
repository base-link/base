import {
  BlueLinkType,
  BlueTermType,
  Color,
  LinkNodeType,
  LinkTermType,
  Mesh,
  SiteObserverState,
  code,
} from '~'
import type {
  BlueConstantType,
  BluePathType,
  BlueTermLinkType,
  BlueValueType,
  LinkPathType,
} from '~'

export function createBlueConstant(
  name: BlueTermLinkType,
  value: BlueValueType | Array<BlueConstantType>,
): BlueConstantType {
  return {
    color: Color.Blue,
    hidden: code.createBlueBoolean(false),
    name,
    state: SiteObserverState.Initialized,
    type: Mesh.Constant,
    value,
  }
}

export function createBlueLink(value: LinkNodeType): BlueLinkType {
  return {
    color: Color.Blue,
    state: SiteObserverState.Initialized,
    type: Mesh.Link,
    value,
  }
}

export function createBluePath(value: LinkPathType): BluePathType {
  return {
    color: Color.Blue,
    state: SiteObserverState.Initialized,
    type: Mesh.Path,
    value,
  }
}

export function createBlueTerm(value: LinkTermType): BlueTermType {
  return {
    color: Color.Blue,
    state: SiteObserverState.Initialized,
    type: Mesh.Term,
    value,
  }
}
