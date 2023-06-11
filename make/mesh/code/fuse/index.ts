// export function attemptResolveFuse(load: code.MeshLoad): void {
//   const name = code.findFullStringConstantByName(load, 'name')
//   code.assertString(name)

//   const templateMesh = code.getEnvironmentProperty(
//     load.environment,
//     'allTemplateMesh',
//   )

//   if (code.isRecord(templateMesh)) {
//     const template = templateMesh[name]
//     if (!template) {
//       return // not yet
//     }

//     const nodes = code.evaluateTemplate(load)
//   }
// }

// export function evaluateTemplate(
//   load: code.MeshLoad,
// ): Array<LinkNodeType> {
//   const result: Array<LinkNodeType> = []

//   return result
// }

// export function load_codeCard_fuse(
//   load: code.MeshLoad,
// ): void {
//   const red = code.pushRed(load, code.createRedGather(load, 'fuse'))
//   const blue = code.createBlue(load, {
//     bind: code.createBlueArray(load),
//     type: Mesh.Inject,
//   })

//   const colorInput = code.withColors(load, { blue, red })

//   code.assumeNest(load).forEach((nest, index) => {
//     code.addTask(load.base, () => {
//       load_codeCard_fuse_nestedChildren(
//         code.withLink(colorInput, nest, index),
//       )
//     })
//   })
// }

// export function load_codeCard_fuse_nestedChildren(
//   load: code.MeshLoad,
// ): void {
//   const type = code.getLinkHint(load)
//   switch (type) {
//     case LinkHint.StaticTerm: {
//       const index = code.assumeLinkIndex(load)
//       const term = code.assumeTermString(load)
//       if (index === 0) {
//         code.attachStaticTerm(load, 'name', term)
//       } else {
//         switch (term) {
//           case 'bind':
//             code.load_codeCard_bind(load)
//             break
//           case 'mark':
//             code.load_codeCard_bond_mark(load)
//             break
//           case 'loan':
//             code.load_codeCard_bond_loan(load)
//             break
//           case 'term':
//             code.load_codeCard_term(load)
//             break
//           default:
//             code.throwError(code.generateUnhandledTermCaseError(load))
//         }
//       }
//       break
//     }
//     default:
//       code.throwError(code.generateUnhandledTermCaseError(load))
//   }
// }
