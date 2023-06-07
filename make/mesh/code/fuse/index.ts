import { LinkHint, LinkNodeType, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

// export function attemptResolveFuse(input: SiteProcessInputType): void {
//   const name = code.findFullStringConstantByName(input, 'name')
//   code.assertString(name)

//   const templateMesh = code.getEnvironmentProperty(
//     input.environment,
//     'allTemplateMesh',
//   )

//   if (code.isRecord(templateMesh)) {
//     const template = templateMesh[name]
//     if (!template) {
//       return // not yet
//     }

//     const nodes = code.evaluateTemplate(input)
//   }
// }

// export function evaluateTemplate(
//   input: SiteProcessInputType,
// ): Array<LinkNodeType> {
//   const result: Array<LinkNodeType> = []

//   return result
// }

// export function process_codeCard_fuse(
//   input: SiteProcessInputType,
// ): void {
//   const red = code.pushRed(input, code.createRedGather(input, 'fuse'))
//   const blue = code.createBlue(input, {
//     bind: code.createBlueArray(input),
//     type: Mesh.Inject,
//   })

//   const colorInput = code.withColors(input, { blue, red })

//   code.assumeNest(input).forEach((nest, index) => {
//     code.addTask(input.base, () => {
//       process_codeCard_fuse_nestedChildren(
//         code.withLink(colorInput, nest, index),
//       )
//     })
//   })
// }

// export function process_codeCard_fuse_nestedChildren(
//   input: SiteProcessInputType,
// ): void {
//   const type = code.getLinkHint(input)
//   switch (type) {
//     case LinkHint.StaticTerm: {
//       const index = code.assumeLinkIndex(input)
//       const term = code.assumeTermString(input)
//       if (index === 0) {
//         code.attachStaticTerm(input, 'name', term)
//       } else {
//         switch (term) {
//           case 'bind':
//             code.process_codeCard_bind(input)
//             break
//           case 'mark':
//             code.process_codeCard_bond_mark(input)
//             break
//           case 'loan':
//             code.process_codeCard_bond_loan(input)
//             break
//           case 'term':
//             code.process_codeCard_term(input)
//             break
//           default:
//             code.throwError(code.generateUnhandledTermCaseError(input))
//         }
//       }
//       break
//     }
//     default:
//       code.throwError(code.generateUnhandledTermCaseError(input))
//   }
// }
