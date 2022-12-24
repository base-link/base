import { Mesh, PartialState, TreeNestType } from '~'

export type MeshBearPartialType = PartialState<
  MeshBearType,
  {
    like: 1
  },
  true
>

export type MeshBearPotentialType =
  | MeshBearPartialType
  | MeshBearType

export type MeshBearType = {
  like: Mesh.Bear
  link: string
}

export type MeshBindPartialType = PartialState<
  MeshBindType,
  {
    like: 1
  },
  true
>

export type MeshBindPotentialType =
  | MeshBindPartialType
  | MeshBindType

export type MeshBindType = {
  bond: MeshBondType
  like: Mesh.Bind
  name: string
}

export type MeshBondType = MeshCordType | MeshMarkType

export type MeshCallPartialType = PartialState<
  MeshCallType,
  {
    bind: 1
    like: 1
  },
  true
>

export type MeshCallPotentialType =
  | MeshCallPartialType
  | MeshCallType

export type MeshCallType = {
  bind: Record<string, MeshBindType>
  like: Mesh.Call
}

export type MeshCordPartialType = PartialState<
  MeshCordType,
  {
    like: 1
  },
  true
>

export type MeshCordPotentialType =
  | MeshCordPartialType
  | MeshCordType

export type MeshCordType = {
  cord: string
  like: Mesh.Cord
}

export type MeshFacePartialType = PartialState<
  MeshFaceType,
  {
    like: 1
  },
  true
>

export type MeshFacePotentialType =
  | MeshFacePartialType
  | MeshFaceType

export type MeshFaceType = {
  like: Mesh.Face
}

export type MeshFlexMixinType = {
  flex: boolean
}

export type MeshFormPartialType = PartialState<
  MeshFormType,
  {
    base: 1
    hook: 1
    like: 1
    link: 1
    task: 1
    wear: 1
  },
  true
>

export type MeshFormPotentialType =
  | MeshFormPartialType
  | MeshFormType

export type MeshFormType = {
  base: Array<MeshFormType>
  hook: Record<string, MeshHookType>
  like: Mesh.Form
  link: Record<string, MeshTakeType>
  name: string
  task: Record<string, MeshTaskType>
  wear: Record<string, MeshWearType>
}

export type MeshFusePartialType = PartialState<
  MeshFuseType,
  {
    bind: 1
    like: 1
  },
  true
>

export type MeshFusePotentialType =
  | MeshFusePartialType
  | MeshFuseType

export type MeshFuseType = {
  bind: Array<MeshBindType>
  like: Mesh.Fuse
  name: string
}

export type MeshHoldPartialType = PartialState<
  MeshHoldType,
  {
    like: 1
  },
  true
>

export type MeshHoldPotentialType =
  | MeshHoldPartialType
  | MeshHoldType

export type MeshHoldType = {
  like: Mesh.Hold
}

export type MeshHookPartialType = PartialState<
  MeshHookType,
  {
    flow: 1
    like: 1
    take: 1
  },
  true
>

export type MeshHookPotentialType =
  | MeshHookPartialType
  | MeshHookType

export type MeshHookType = {
  flow: Array<MeshTaskFlowType>
  like: Mesh.Hook
  name: string
  take: Record<string, MeshTakeType>
}

export type MeshHostPartialType = PartialState<
  MeshHostType,
  {
    like: 1
  },
  true
>

export type MeshHostPotentialType =
  | MeshHostPartialType
  | MeshHostType

export type MeshHostType = {
  like: Mesh.Host
}

export type MeshLikePartialType = PartialState<
  MeshLikeType,
  {
    bind: 1
    like: 1
  },
  true
>

export type MeshLikePotentialType =
  | MeshLikePartialType
  | MeshLikeType

export type MeshLikeType = {
  bind: Record<string, MeshLikeType | MeshLikePartialType>
  like: Mesh.Like
  name: string
}

export type MeshLoadPartialType = PartialState<
  MeshLoadType,
  {
    like: 1
    take: 1
  },
  true
>

export type MeshLoadPotentialType =
  | MeshLoadPartialType
  | MeshLoadType

export type MeshLoadTakePartialType = PartialState<
  MeshLoadTakeType,
  {
    like: 1
  },
  true
>

export type MeshLoadTakePotentialType =
  | MeshLoadTakePartialType
  | MeshLoadTakeType

export type MeshLoadTakeSavePartialType = PartialState<
  MeshLoadTakeSaveType,
  {
    like: 1
  },
  true
>

export type MeshLoadTakeSavePotentialType =
  | MeshLoadTakeSavePartialType
  | MeshLoadTakeSaveType

export type MeshLoadTakeSaveType = {
  like: Mesh.LoadTakeSave
  name: string
}

export type MeshLoadTakeType = {
  like: Mesh.LoadTake
  name: string
  save?: MeshLoadTakeSavePotentialType
}

export type MeshLoadType = {
  like: Mesh.Load
  link: string
  take: Array<MeshLoadTakeType | MeshLoadTakePartialType>
}

export type MeshMarkPartialType = PartialState<
  MeshMarkType,
  {
    like: 1
  },
  true
>

export type MeshMarkPotentialType =
  | MeshMarkPartialType
  | MeshMarkType

export type MeshMarkType = {
  like: Mesh.Mark
  mark: number
}

export type MeshReadDrawPartialType = PartialState<
  MeshReadDrawType,
  {
    like: 1
  },
  true
>

export type MeshReadDrawPotentialType =
  | MeshReadDrawPartialType
  | MeshReadDrawType

// clone
export type MeshReadDrawType = MeshFlexMixinType & {
  like: Mesh.ReadDraw
  link: TreeNestType
}

export type MeshReadLoanPartialType = PartialState<
  MeshReadLoanType,
  {
    like: 1
  },
  true
>

export type MeshReadLoanPotentialType =
  | MeshReadLoanPartialType
  | MeshReadLoanType

// borrow
export type MeshReadLoanType = MeshFlexMixinType & {
  like: Mesh.ReadLoan
  link: TreeNestType
}

export type MeshReadMovePartialType = PartialState<
  MeshReadMoveType,
  {
    like: 1
  },
  true
>

export type MeshReadMovePotentialType =
  | MeshReadMovePartialType
  | MeshReadMoveType

// move
export type MeshReadMoveType = MeshFlexMixinType & {
  like: Mesh.ReadMove
  link: TreeNestType
}

export type MeshReadType =
  | MeshReadMoveType
  | MeshReadLoanType
  | MeshReadDrawType

export type MeshScopeType = {
  data: Record<string, unknown>
  like: Mesh.Scope
  parent?: MeshScopeType
}

// request handler
export type MeshSeekType = {
  like: Mesh.Seek
  link: MeshCordType | MeshTermType
  task: MeshTaskType
}

export type MeshSuitPartialType = PartialState<
  MeshSuitType,
  {
    like: 1
    link: 1
    task: 1
  },
  true
>

export type MeshSuitPotentialType =
  | MeshSuitPartialType
  | MeshSuitType

export type MeshSuitTaskPartialType = PartialState<
  MeshSuitTaskType,
  {
    like: 1
  },
  true
>

export type MeshSuitTaskPotentialType =
  | MeshSuitTaskPartialType
  | MeshSuitTaskType

export type MeshSuitTaskType = {
  like: Mesh.SuitTask
}

export type MeshSuitType = {
  like: Mesh.Suit
  link: Record<string, MeshTakeType>
  task: Record<string, MeshSuitTaskType>
}

export type MeshTakePartialType = PartialState<
  MeshTakeType,
  {
    like: 1
  },
  true
>

export type MeshTakePotentialType =
  | MeshTakePartialType
  | MeshTakeType

export type MeshTakeType = {
  like: Mesh.Take
  name: string
  takeLike: MeshLikeType
}

export type MeshTaskFlowType = MeshCallType | MeshHoldType

export type MeshTaskPartialType = PartialState<
  MeshTaskType,
  {
    flow: 1
    like: 1
    take: 1
    task: 1
  },
  true
>

export type MeshTaskPotentialType =
  | MeshTaskPartialType
  | MeshTaskType

export type MeshTaskType = {
  flow: Array<MeshTaskFlowType>
  like: Mesh.Task
  take: Record<string, MeshTakeType>
  task: Record<string, MeshTaskType>
}

export type MeshTermPartialType = PartialState<
  MeshTermType,
  {
    like: 1
  },
  true
>

export type MeshTermPotentialType =
  | MeshTermPartialType
  | MeshTermType

export type MeshTermType = {
  like: Mesh.Term
  name: string
}

export type MeshTestPartialType = PartialState<
  MeshTestType,
  {
    like: 1
  },
  true
>

export type MeshTestPotentialType =
  | MeshTestPartialType
  | MeshTestType

export type MeshTestType = {
  like: Mesh.Test
}

export type MeshTreePartialType = PartialState<
  MeshTreeType,
  {
    like: 1
    take: 1
  },
  true
>

export type MeshTreePotentialType =
  | MeshTreePartialType
  | MeshTreeType

export type MeshTreeType = {
  like: Mesh.Tree
  take: Record<string, MeshTakeType>
}

export type MeshWearPartialType = PartialState<
  MeshWearType,
  {
    like: 1
    link: 1
    task: 1
  },
  true
>

export type MeshWearPotentialType =
  | MeshWearPartialType
  | MeshWearType

export type MeshWearType = {
  like: Mesh.Wear
  link: Record<string, MeshTakeType>
  name: string
  task: Record<string, MeshTaskType>
}

export type MeshZonePartialType = PartialState<
  MeshZoneType,
  {
    like: 1
    tool: 1
  },
  true
>

export type MeshZonePotentialType =
  | MeshZonePartialType
  | MeshZoneType

export type MeshZoneToolPartialType = PartialState<
  MeshZoneToolType,
  {
    like: 1
  },
  true
>

export type MeshZoneToolPotentialType =
  | MeshZoneToolPartialType
  | MeshZoneToolType

export type MeshZoneToolType = {
  like: Mesh.ZoneTool
  zone: MeshZoneType
}

export type MeshZoneType = {
  like: Mesh.Zone
  name: string
  tool: Array<MeshZoneToolType>
}
