export {};
// export function attemptResolveFuse(load: MeshLoad): void {
//   const name = card.findFullStringConstantByName(load, 'name')
//   card.assertString(name)
//   const templateMesh = card.getEnvironmentProperty(
//     load.environment,
//     'allTemplateMesh',
//   )
//   if (card.isRecord(templateMesh)) {
//     const template = templateMesh[name]
//     if (!template) {
//       return // not yet
//     }
//     const nodes = card.evaluateTemplate(load)
//   }
// }
// export function evaluateTemplate(
//   load: MeshLoad,
// ): Array<LinkNodeType> {
//   const result: Array<LinkNodeType> = []
//   return result
// }
// export function load_codeCard_fuse(
//   load: MeshLoad,
// ): void {
//   const red = card.pushRed(load, card.createRedGather(load, 'fuse'))
//   const blue = card.createBlue(load, {
//     bind: card.createBlueArray(load),
//     type: Mesh.Inject,
//   })
//   const colorInput = card.withColors(load, { blue, red })
//   card.assumeNest(load).forEach((nest, index) => {
//     tool.loadTask(load.base, () => {
//       load_codeCard_fuse_nestedChildren(
//         card.withLink(colorInput, nest, index),
//       )
//     })
//   })
// }
// export function load_codeCard_fuse_nestedChildren(
//   load: MeshLoad,
// ): void {
//   const type = card.getLinkHint(load)
//   switch (type) {
//     case LinkHint.StaticTerm: {
//       const index = card.loadLinkIndex(load)
//       const term = card.assumeTermString(load)
//       if (index === 0) {
//         card.attachStaticTerm(load, 'name', term)
//       } else {
//         switch (term) {
//           case 'bind':
//             card.load_codeCard_bind(load)
//             break
//           case 'mark':
//             card.load_codeCard_bond_mark(load)
//             break
//           case 'loan':
//             card.load_codeCard_bond_loan(load)
//             break
//           case 'term':
//             card.load_codeCard_term(load)
//             break
//           default:
//             card.throwError(card.generateUnhandledTermCaseError(load))
//         }
//       }
//       break
//     }
//     default:
//       card.throwError(card.generateUnhandledTermCaseError(load))
//   }
// }
//# sourceMappingURL=index.js.map