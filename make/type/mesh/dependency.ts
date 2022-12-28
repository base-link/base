import { api , api } from '~'
import type { APIInputType } from '~'

import type {  } from './list'

export type ASTBindableObjectType = {
  // callbacks to the dependency handler
  // then the dependency handler calls back to
  // the original source compiler handler
  callbackList: Array<
    ASTInputCallbackType<Record<string, unknown>>
  >
  children: Array<undefined>
  data: Record<string, unknown>
  like: AST.BindableObject
  parent?: ASTBindableObjectType
  partial: false
}

export type ASTBindableStringType = {
  callbackList: Array<ASTInputCallbackType<string>>
  children: Array<undefined>
  data: string
  like: AST.BindableString
  parent?: ASTBindableObjectType
  partial: false
}

export type ASTDependencyPartCallbackType = (
  value: unknown,
) => void

export type ASTDependencyPartType = {
  callbackList: Array<ASTDependencyPartCallbackType>
  children: Array<undefined>
  last?: ASTDependencyPartType
  like: AST.DependencyPart
  name: string
  next?: ASTDependencyPartType
  parent: ASTDependencyType
  partial: false
}

export type ASTDependencyType = {
  callbackList: Array<ASTInputCallbackType<APIInputType>>
  children: Array<undefined>
  context: APIInputType
  like: AST.Dependency
  partial: false
  path: Array<ASTDependencyPartType>
}

export type ASTInputCallbackType<T> = (value: T) => void

export type ASTLexicalScopeType = {
  children: Array<undefined>
  data: Record<string, unknown>
  like: AST.LexicalScope
  parent?: ASTLexicalScopeType
  partial: false
}
