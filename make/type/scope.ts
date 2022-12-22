import {
  InitialMeshCodeCardType,
  InitialMeshDeckCardType,
  InitialMeshFormType,
  TreeNestType,
} from '~'

export type ParentScopeType<S> =
  | S
  | (S extends ScopeType<infer X, infer Y>
      ? Y extends ScopeType<infer A, infer B>
        ? ParentScopeType<Y>
        : never
      : never)

enum ScopeCardData {
  CodeCard = 'code-card',
  DeckCard = 'deck-card',
}

export enum Scope {
  CodeCard = 'scope-code-card',
  DeckCard = 'scope-deck-card',
  Form = 'scope-form',
  Nest = 'scope-nest',
}

export type ScopeCardDataTableType = {
  'code-card': InitialMeshCodeCardType
  'deck-card': InitialMeshDeckCardType
}

export type ScopeCardDataType<S extends ScopeCardData> = {
  card: ScopeCardDataTableType[S]
}

export type ScopeFormDataType = {
  form: InitialMeshFormType
}

export type ScopeKeyListType<
  L extends Scope,
  T extends ScopeType<L>,
> = T['parent'] extends ScopeType<infer A extends Scope>
  ? keyof T['data'] | ScopeKeyListType<A, T['parent']>
  : keyof T['data']

export type ScopeNestDataType = {
  index: number
  nest: TreeNestType
}

export type ScopeTableType = {
  'scope-code-card': ScopeCardDataType<ScopeCardData.CodeCard>
  'scope-deck-card': ScopeCardDataType<ScopeCardData.DeckCard>
  'scope-form': ScopeFormDataType
  'scope-nest': ScopeNestDataType
}

export type ScopeType<
  S extends Scope,
  P extends unknown = unknown,
> = {
  data: ScopeTableType[S]
  like: S
  parent?: P extends ScopeType<infer T extends Scope, infer Q>
    ? P
    : never
}

export type ScopeValueType<
  L extends Scope,
  T extends ScopeType<L>,
  K extends string | number | symbol,
> = T['data'] extends { [key in K]: unknown }
  ? T['data'][K]
  : T['parent'] extends ScopeType<infer A extends Scope>
  ? ScopeValueType<A, T['parent'], K>
  : never
