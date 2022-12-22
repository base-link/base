type TreeType<T> = {
  left?: TreeType<T>
  right?: TreeType<T>
  value: T
}

type TreeUnwrapperType<T> = T extends TreeType<infer X>
  ? X
  : never

type TreeAliasType<T> = T extends TreeType<infer X>
  ? X extends object
    ? T
    : never
  : never

type UserType = {
  email: string
}

const tree: TreeType<UserType> = {
  value: { email: 'foo@bar.com' },
}

const user: TreeUnwrapperType<TreeType<UserType>> = {
  email: 'foo@bar.com',
}

const tree2: TreeAliasType<TreeType<UserType>> = {
  value: { email: 'foo@bar.com' },
}

type ScopeType<S, P extends unknown = unknown> = {
  data: S
  parent?: P extends ScopeType<infer T, infer Q>
    ? ScopeType<T, Q>
    : never
}

type PossibleScopeType<ST extends object> =
  ST extends ScopeType<
    infer S,
    infer P extends ScopeType<infer A, infer B>
  >
    ? object | PossibleScopeType<P>
    : never

type ModuleType = {
  path: string
}

const scope: ScopeType<ModuleType> = {
  data: {
    path: './foo.x',
  },
}

const scope2: ScopeType<UserType, ScopeType<ModuleType>> = {
  data: {
    email: 'foo@bar.com',
  },
  parent: scope,
}

let scope3: PossibleScopeType<ScopeType<ModuleType>> = scope2
scope3 = scope
scope3 = true

export type ParentScopeType<S> = S extends ScopeType<
  infer X,
  infer PS
>
  ? S | PS | ParentScopeType<PS>
  : S

export type ParentScopeType2<S> = S extends ScopeType<
  infer X,
  infer Y extends ScopeType<infer A, infer B>
>
  ? S
  : S

let source: ScopeAliasType<typeof scope> | undefined = scope2

export type ScopeAliasType<S> = ParentScopeType<S>
