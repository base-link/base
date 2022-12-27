import { AST, PartialState } from '~'

export type ASTPackageLicensePartialType = PartialState<
  ASTPackageLicenseType,
  {
    like: 1
  },
  true
>

export type ASTPackageLicensePotentialType =
  | ASTPackageLicensePartialType
  | ASTPackageLicenseType

export type ASTPackageLicenseType = {
  like: AST.PackageLicense
  name: string
  partial: false
}

export type ASTPackagePartialType = PartialState<
  ASTPackageType,
  {
    face: 1
    like: 1
    term: 1
  },
  true
>

export type ASTPackagePotentialType =
  | ASTPackagePartialType
  | ASTPackageType

export type ASTPackageType = {
  bear?: string
  face: Array<ASTPackageUserType>
  host: string
  like: AST.Package
  mark: string
  name: string
  read?: string
  site?: string
  term: Array<ASTPackageLicenseType>
  test?: string
}

export type ASTPackageUserPartialType = PartialState<
  ASTPackageUserType,
  {
    like: 1
  },
  true
>

export type ASTPackageUserPotentialType =
  | ASTPackageUserPartialType
  | ASTPackageUserType

export type ASTPackageUserType = {
  email?: string
  like: AST.PackageUser
  name?: string
}
