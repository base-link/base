export {};
// export function load_codeCard_hook(
//   load: MeshLoad,
// ): void {
//   const hook = card.createNest(Nest.Callback)
//   card.gatherIntoMeshParent(load, hook)
//   const childInput = card.withElement(load, hook)
//   card.loadLink(childInput, Link.Tree).nest.forEach((nest, index) => {
//     card.load_codeCard_hook_nestedChildren(
//       card.withLink(childInput, nest, index),
//     )
//   })
// }
// export function load_codeCard_hook_nestedChildren(
//   load: MeshLoad,
// ): void {
//   const type = card.getLinkHint(load)
//   switch (type) {
//     case LinkHint.StaticTerm: {
//       const index = card.loadLinkIndex(load)
//       const term = card.assumeTermString(load)
//       if (index === 0) {
//         card.gatherIntoMeshParent(
//           load,
//           card.createStringConstant('name', term),
//         )
//       } else {
//         switch (term) {
//           case 'task':
//             card.load_codeCard_task(load)
//             break
//           case 'head':
//             card.load_codeCard_head(load)
//             break
//           case 'call':
//             card.load_codeCard_call(load)
//             break
//           case 'slot':
//             card.load_codeCard_slot(load)
//             break
//           case 'walk':
//             card.load_codeCard_walk(load)
//             break
//           case 'save':
//             card.load_codeCard_save(load)
//             break
//           case 'back':
//             card.load_codeCard_task_back(load)
//             break
//           case 'hide':
//             card.load_codeCard_hide(load)
//             break
//           case 'wait':
//             card.load_codeCard_wait(load)
//             break
//           case 'risk':
//             card.load_codeCard_risk(load)
//             break
//           case 'base':
//             card.load_codeCard_task_base(load)
//             break
//           case 'fuse':
//             card.load_codeCard_fuse(load)
//             break
//           case 'hold':
//             card.load_codeCard_hold(load)
//             break
//           case 'stem':
//             card.load_codeCard_stem(load)
//             break
//           case 'note':
//             card.load_codeCard_note(load)
//             break
//           default:
//             card.throwError(card.generateUnhandledTermCaseError(load))
//         }
//       }
//       break
//     }
//     default:
//       card.throwError(card.generateUnhandledNestCaseError(load, type))
//   }
// }
//# sourceMappingURL=index.js.map