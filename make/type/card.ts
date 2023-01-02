import { Base, LinkTreeType, Mesh } from '~'
import type {
  MeshCallback_FullType,
  MeshCallback_Type,
  MeshClassInterface_FullType,
  MeshClassInterface_Type,
  MeshClass_FullType,
  MeshClass_Type,
  MeshComponent_FullType,
  MeshComponent_Type,
  MeshConstant_FullType,
  MeshConstant_Type,
  MeshExport_FullType,
  MeshExport_Type,
  MeshFunction_FullType,
  MeshFunction_Type,
  MeshImport_FullType,
  MeshImport_Type,
  MeshNativeClassInterface_FullType,
  MeshNativeClassInterface_Type,
  MeshPackage_FullType,
  MeshPackage_Type,
  MeshTemplate_FullType,
  MeshTemplate_Type,
  MeshTest_FullType,
  MeshTest_Type,
  Mesh_FullTypeMixin,
  Mesh_PartialTypeMixin,
} from '~'

export type MeshBookModule_FullType = Mesh_FullTypeMixin &
  MeshModuleBaseType & {
    abstract: string
    like: Mesh.BookModule
    tags: Array<string>
    title: string
    // text: Array<MeshBookSection_PartialType>
  }

export type MeshBookModule_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<unknown>
    like: Mesh.BookModule
  }

export type MeshBookModule_Type =
  | MeshBookModule_FullType
  | MeshBookModule_PartialType

export type MeshCodeModule_FullType = Mesh_FullTypeMixin &
  MeshModuleBaseType & {
    allClassInterfaceMesh: Record<
      string,
      MeshClassInterface_FullType
    >
    allClassMesh: Record<string, MeshClass_FullType>
    allComponentMesh: Record<string, MeshComponent_FullType>
    allConstantMesh: Record<string, MeshConstant_FullType>
    allFunctionMesh: Record<string, MeshFunction_FullType>
    allTemplateMesh: Record<string, MeshTemplate_FullType>
    allTestMesh: Record<string, MeshTest_FullType>
    callbackMesh: Record<string, MeshCallback_FullType>
    constantMesh: Record<string, MeshConstant_FullType>
    exportList: Array<MeshExport_FullType>
    importTree: Array<MeshImport_FullType>
    like: Mesh.CodeModule
    nativeClassInterfaceMesh: Record<
      string,
      MeshNativeClassInterface_FullType
    >
    publicClassInterfaceMesh: Record<
      string,
      MeshClassInterface_FullType
    >
    publicClassMesh: Record<string, MeshClass_FullType>
    publicComponentMesh: Record<string, MeshComponent_FullType>
    publicConstantMesh: Record<string, MeshConstant_FullType>
    publicFunctionMesh: Record<string, MeshFunction_FullType>
    publicNativeClassInterfaceMesh: Record<
      string,
      MeshNativeClassInterface_FullType
    >
    publicTemplateMesh: Record<string, MeshTemplate_FullType>
    publicTestMesh: Record<string, MeshTest_FullType>
  }

export type MeshCodeModule_PartialType = MeshModuleBaseType &
  Mesh_PartialTypeMixin & {
    children: Array<
      | MeshClassInterface_Type
      | MeshFunction_Type
      | MeshTest_Type
      | MeshTemplate_Type
      | MeshComponent_Type
      | MeshNativeClassInterface_Type
      | MeshClass_Type
      | MeshCallback_Type
      | MeshConstant_Type
      | MeshImport_Type
      | MeshExport_Type
    >
    like: Mesh.CodeModule
  }

export type MeshCodeModule_Type =
  | MeshCodeModule_FullType
  | MeshCodeModule_PartialType

export type MeshModuleBaseType = {
  base: Base
  directory: string
  link: LinkTreeType
  path: string
  text: string
  textByLine: Array<string>
}

export type MeshModule_FullType =
  | MeshCodeModule_FullType
  | MeshPackageModule_FullType

export type MeshModule_PartialType =
  | MeshCodeModule_PartialType
  | MeshPackageModule_PartialType

export type MeshModule_Type =
  | MeshModule_FullType
  | MeshModule_PartialType

export type MeshPackageModule_FullType = MeshModuleBaseType &
  Mesh_FullTypeMixin & {
    deck: MeshPackage_FullType
    like: Mesh.PackageModule
  }

export type MeshPackageModule_PartialType = MeshModuleBaseType &
  Mesh_PartialTypeMixin & {
    children: Array<MeshPackage_Type>
    like: Mesh.PackageModule
  }

export type MeshPackageModule_Type =
  | MeshPackageModule_FullType
  | MeshPackageModule_PartialType
