import { Link, LinkHint, Mesh, code } from '~'
import type { MeshLoad } from '~'

// export function load_codeCard_hook(
//   load: MeshLoad,
// ): void {
//   const hook = code.createNest(Nest.Callback)
//   code.gatherIntoMeshParent(load, hook)

//   const childInput = code.withElement(load, hook)

//   code.assumeLink(childInput, Link.Tree).nest.forEach((nest, index) => {
//     code.load_codeCard_hook_nestedChildren(
//       code.withLink(childInput, nest, index),
//     )
//   })
// }

// export function load_codeCard_hook_nestedChildren(
//   load: MeshLoad,
// ): void {
//   const type = code.getLinkHint(load)
//   switch (type) {
//     case LinkHint.StaticTerm: {
//       const index = code.assumeLinkIndex(load)
//       const term = code.assumeTermString(load)
//       if (index === 0) {
//         code.gatherIntoMeshParent(
//           load,
//           code.createStringConstant('name', term),
//         )
//       } else {
//         switch (term) {
//           case 'task':
//             code.load_codeCard_task(load)
//             break
//           case 'head':
//             code.load_codeCard_head(load)
//             break
//           case 'call':
//             code.load_codeCard_call(load)
//             break
//           case 'slot':
//             code.load_codeCard_slot(load)
//             break
//           case 'walk':
//             code.load_codeCard_walk(load)
//             break
//           case 'save':
//             code.load_codeCard_save(load)
//             break
//           case 'back':
//             code.load_codeCard_task_back(load)
//             break
//           case 'hide':
//             code.load_codeCard_hide(load)
//             break
//           case 'wait':
//             code.load_codeCard_wait(load)
//             break
//           case 'risk':
//             code.load_codeCard_risk(load)
//             break
//           case 'base':
//             code.load_codeCard_task_base(load)
//             break
//           case 'fuse':
//             code.load_codeCard_fuse(load)
//             break
//           case 'hold':
//             code.load_codeCard_hold(load)
//             break
//           case 'stem':
//             code.load_codeCard_stem(load)
//             break
//           case 'note':
//             code.load_codeCard_note(load)
//             break
//           default:
//             code.throwError(code.generateUnhandledTermCaseError(load))
//         }
//       }
//       break
//     }
//     default:
//       code.throwError(code.generateUnhandledNestCaseError(load, type))
//   }
// }
