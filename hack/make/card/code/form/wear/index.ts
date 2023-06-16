// export function load_codeCard_form_wear(
//   load: MeshLoad,
// ): void {
//   const container = card.createContainerScope(load)
//   const scope = card.createStepScope(container)
//   const scopeInput = card.withScope(load, scope)
//   return
//   const wear = card.createNest(
//     Mesh.ClassInterfaceImplementation,
//     load.scope,
//   )
//   const childInput = card.withElement(scopeInput, wear)

//   card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
//     load_codeCard_form_wear_leadLink(
//       card.withLink(childInput, nest, index),
//     )
//   })
// }

// export function load_codeCard_form_wear_leadLink(
//   load: MeshLoad,
// ): void {
//   const type = card.getLinkHint(load)
//   switch (type) {
//     case LinkHint.StaticTerm: {
//       const term = card.assumeTermString(load)
//       const index = card.loadLinkIndex(load)
//       if (index === 0) {
//         const wear = card.assumeElementAsNest(
//           load,
//           Mesh.ClassInterfaceImplementation,
//         )
//         wear.children.push(card.createStringConstant('name', term))
//         return
//       }

//       switch (term) {
//         case 'head':
//           card.load_codeCard_head(load)
//           break
//         default:
//           card.throwError(card.generateUnknownTermError(load))
//       }
//       break
//     }
//     default:
//       card.throwError(card.generateUnhandledTermCaseError(load))
//   }
// }
