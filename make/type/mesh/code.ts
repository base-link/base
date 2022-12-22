import { Mesh, TreeNestType } from '~'

export type MeshBearType = {
  like: Mesh.Bear
  link: string
}

export type MeshBindType = {
  bond: MeshBondType
  like: Mesh.Bind
  name: string
}

export type MeshBondType = MeshCordType | MeshMarkType

export type MeshCallType = {
  bind: Record<string, MeshBindType>
  like: Mesh.Call
}

export type MeshCordType = {
  cord: string
  like: Mesh.Cord
}

export type MeshFaceType = {
  like: Mesh.Face
}

export type MeshFlexMixinType = {
  flex: boolean
}

export type MeshFormType = {
  base: Array<MeshFormType>
  hook: Record<string, MeshHookType>
  like: Mesh.Form
  link: Record<string, MeshTakeType>
  name: string
  task: Record<string, MeshTaskType>
  wear: Record<string, MeshWearType>
}

export type MeshHoldType = {
  like: Mesh.Hold
}

export type MeshHookType = {
  flow: Array<MeshTaskFlowType>
  like: Mesh.Hook
  name: string
  take: Record<string, MeshTakeType>
}

export type MeshHostType = {
  like: Mesh.Host
}

export type MeshLikeType = {
  bind?: Record<string, MeshLikeType>
  like: Mesh.Like
  name: string
}

export type MeshLoadTakeSaveType = {
  form: string
  like: Mesh.LoadTakeSave
  name: string
}

export type MeshLoadTakeType = {
  form: string
  like: Mesh.LoadTake
  name: string
  save?: MeshLoadTakeSaveType
}

export type MeshLoadType = {
  like: Mesh.Load
  link: string
  take: Array<MeshLoadTakeType>
}

export type MeshMarkType = {
  like: Mesh.Mark
  mark: number
}

// clone
export type MeshReadDrawType = MeshFlexMixinType & {
  like: Mesh.ReadDraw
  link: TreeNestType
}

// borrow
export type MeshReadLoanType = MeshFlexMixinType & {
  like: Mesh.ReadLoan
  link: TreeNestType
}

// move
export type MeshReadMoveType = MeshFlexMixinType & {
  like: Mesh.ReadMove
  link: TreeNestType
}

export type MeshReadType =
  | MeshReadMoveType
  | MeshReadLoanType
  | MeshReadDrawType

// request handler
export type MeshSeekType = {
  like: Mesh.Seek
  link: MeshCordType | MeshTermType
  task: MeshTaskType
}

export type MeshSuitTaskType = {
  like: Mesh.SuitTask
}

export type MeshSuitType = {
  like: Mesh.Suit
  link: Record<string, MeshTakeType>
  task: Record<string, MeshSuitTaskType>
}

export type MeshTakeType = {
  like: Mesh.Take
  name: string
  takeLike: MeshLikeType
}

export type MeshTaskFlowType = MeshCallType | MeshHoldType

export type MeshTaskType = {
  like: Mesh.Task
  move: Array<MeshTaskFlowType>
  take: Record<string, MeshTakeType>
  task: Record<string, MeshTaskType>
}

export type MeshTermType = {
  like: Mesh.Term
  name: string
}

export type MeshTestType = {
  like: Mesh.Test
}

export type MeshTreeType = {
  like: Mesh.Tree
  take: Record<string, MeshTakeType>
}

export type MeshWearType = {
  like: Mesh.Wear
  link: Record<string, MeshTakeType>
  name: string
  task: Record<string, MeshTaskType>
}

export type MeshZoneToolType = {
  like: Mesh.ZoneTool
  zone: MeshZoneType
}

export type MeshZoneType = {
  like: Mesh.Zone
  name: string
  tool: Array<MeshZoneToolType>
}
