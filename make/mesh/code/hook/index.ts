import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

// export function load_codeCard_hook(
//   input: SiteProcessInputType,
// ): void {
//   const hook = code.createNest(Nest.Callback)
//   code.gatherIntoMeshParent(input, hook)

//   const childInput = code.withElement(input, hook)

//   code.assumeLink(childInput, Link.Tree).nest.forEach((nest, index) => {
//     code.load_codeCard_hook_nestedChildren(
//       code.withLink(childInput, nest, index),
//     )
//   })
// }

// export function load_codeCard_hook_nestedChildren(
//   input: SiteProcessInputType,
// ): void {
//   const type = code.getLinkHint(input)
//   switch (type) {
//     case LinkHint.StaticTerm: {
//       const index = code.assumeLinkIndex(input)
//       const term = code.assumeTermString(input)
//       if (index === 0) {
//         code.gatherIntoMeshParent(
//           input,
//           code.createStringConstant('name', term),
//         )
//       } else {
//         switch (term) {
//           case 'task':
//             code.load_codeCard_task(input)
//             break
//           case 'head':
//             code.load_codeCard_head(input)
//             break
//           case 'call':
//             code.load_codeCard_call(input)
//             break
//           case 'slot':
//             code.load_codeCard_slot(input)
//             break
//           case 'walk':
//             code.load_codeCard_walk(input)
//             break
//           case 'save':
//             code.load_codeCard_save(input)
//             break
//           case 'back':
//             code.load_codeCard_task_back(input)
//             break
//           case 'hide':
//             code.load_codeCard_hide(input)
//             break
//           case 'wait':
//             code.load_codeCard_wait(input)
//             break
//           case 'risk':
//             code.load_codeCard_risk(input)
//             break
//           case 'base':
//             code.load_codeCard_task_base(input)
//             break
//           case 'fuse':
//             code.load_codeCard_fuse(input)
//             break
//           case 'hold':
//             code.load_codeCard_hold(input)
//             break
//           case 'stem':
//             code.load_codeCard_stem(input)
//             break
//           case 'note':
//             code.load_codeCard_note(input)
//             break
//           default:
//             code.throwError(code.generateUnhandledTermCaseError(input))
//         }
//       }
//       break
//     }
//     default:
//       code.throwError(code.generateUnhandledNestCaseError(input, type))
//   }
// }
