import { LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_tree_hook(
  input: SiteProcessInputType,
): void {
  // const red = code.pushRed(
  //   input,
  //   code.createRedGather(input, 'callback'),
  // )
  // const blue = code.pushBlue(input, 'callbacks', {
  //   functions: [],
  //   inputs: [],
  //   steps: [],
  //   type: Mesh.Callback,
  // })

  // const colorInput = code.withColors(input, { blue, red })

  code.assumeNest(input).forEach((nest, index) => {
    code.addTask(input.base, () => {
      process_codeCard_tree_hook_nestedChildren(
        code.withLink(input, nest, index),
      )
    })
  })
}

export function process_codeCard_tree_hook_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        // const name = code.assumeTermString(input)
        // const blueString = code.createBlueString(name)
        // code.pushRed(
        //   input,
        //   code.createRedValue(input, 'name', blueString),
        // )
        // code.attachBlue(input, 'name', blueString)
      } else {
        // const nest = code.assumeLink(input)
        // code.gatherIntoMeshParent(input, nest)
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}
