import {
  AST,
  ASTString_Type,
  AST_FullTypeMixin,
  AST_PartialTypeMixin,
} from '~'

export type ASTPackageLicense_FullType = AST_FullTypeMixin & {
  like: AST.PackageLicense
  name: string
}

export type ASTPackageLicense_PartialType = {
  children: Array<ASTString_Type>
  like: AST.PackageLicense
}

export type ASTPackageLicense_Type =
  | ASTPackageLicense_PartialType
  | ASTPackageLicense_FullType

export type ASTPackageUser_FullType = AST_FullTypeMixin & {
  email?: string
  like: AST.PackageUser
  name?: string
}

export type ASTPackageUser_PartialType =
  AST_PartialTypeMixin & {
    children: Array<ASTString_Type>
    like: AST.PackageUser
  }

export type ASTPackageUser_Type =
  | ASTPackageUser_PartialType
  | ASTPackageUser_FullType

export type ASTPackage_FullType = {
  bear?: string
  face: Array<ASTPackageUser_Type>
  host: string
  like: AST.Package
  mark: string
  name: string
  read?: string
  site?: string
  term: Array<ASTPackageLicense_Type>
  test?: string
}

export type ASTPackage_PartialType = AST_PartialTypeMixin & {
  children: Array<
    | ASTPackageUser_Type
    | ASTString_Type
    | ASTPackageLicense_Type
  >
  like: AST.Package
}

export type ASTPackage_Type =
  | ASTPackage_PartialType
  | ASTPackage_FullType
