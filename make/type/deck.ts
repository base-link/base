import {
  Mesh,
  MeshConstant_Type,
  MeshString_Type,
  Mesh_FullTypeMixin,
  Mesh_PartialTypeMixin,
} from '~'

export type MeshPackageLicense_FullType = Mesh_FullTypeMixin & {
  like: Mesh.PackageLicense
  name: string
}

export type MeshPackageLicense_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<MeshString_Type>
    like: Mesh.PackageLicense
  }

export type MeshPackageLicense_Type =
  | MeshPackageLicense_PartialType
  | MeshPackageLicense_FullType

export type MeshPackageUser_FullType = Mesh_FullTypeMixin & {
  email?: string
  like: Mesh.PackageUser
  name?: string
}

export type MeshPackageUser_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<MeshString_Type>
    like: Mesh.PackageUser
  }

export type MeshPackageUser_Type =
  | MeshPackageUser_PartialType
  | MeshPackageUser_FullType

export type MeshPackage_FullType = Mesh_FullTypeMixin & {
  bear?: string
  face: Array<MeshPackageUser_Type>
  host: string
  like: Mesh.Package
  mark: string
  name: string
  read?: string
  site?: string
  term: Array<MeshPackageLicense_Type>
  test?: string
}

export type MeshPackage_PartialType = Mesh_PartialTypeMixin & {
  children: Array<
    | MeshPackageUser_Type
    | MeshString_Type
    | MeshPackageLicense_Type
    | MeshConstant_Type
  >
  like: Mesh.Package
}

export type MeshPackage_Type =
  | MeshPackage_PartialType
  | MeshPackage_FullType
