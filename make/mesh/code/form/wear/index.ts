// export function load_codeCard_form_wear(
//   load: code.MeshLoad,
// ): void {
//   const container = code.createContainerScope(load)
//   const scope = code.createStepScope(container)
//   const scopeInput = code.withScope(load, scope)
//   return
//   const wear = code.createNest(
//     Mesh.ClassInterfaceImplementation,
//     load.scope,
//   )
//   const childInput = code.withElement(scopeInput, wear)

//   code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
//     load_codeCard_form_wear_nestedChildren(
//       code.withLink(childInput, nest, index),
//     )
//   })
// }

// export function load_codeCard_form_wear_nestedChildren(
//   load: code.MeshLoad,
// ): void {
//   const type = code.getLinkHint(load)
//   switch (type) {
//     case LinkHint.StaticTerm: {
//       const term = code.assumeTermString(load)
//       const index = code.assumeLinkIndex(load)
//       if (index === 0) {
//         const wear = code.assumeElementAsNest(
//           load,
//           Mesh.ClassInterfaceImplementation,
//         )
//         wear.children.push(code.createStringConstant('name', term))
//         return
//       }

//       switch (term) {
//         case 'head':
//           code.load_codeCard_head(load)
//           break
//         default:
//           code.throwError(code.generateUnknownTermError(load))
//       }
//       break
//     }
//     default:
//       code.throwError(code.generateUnhandledTermCaseError(load))
//   }
// }
