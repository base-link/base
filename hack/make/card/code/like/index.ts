import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_like(load: MeshLoad): void {
  const red = card.pushRed(
    load,
    card.createRedGather(load, 'definedType'),
  )
  const blue = card.attachBlue(load, 'definedType', {
    bind: [] as unknown as card.BlueArrayType<card.BlueClassReferenceType>,
    type: Mesh.ClassReference,
  })

  const childInput = card.withColors(load, { blue, red })

  card.assumeNest(load).forEach((nest, index) => {
    tool.loadTask(load.base, () => {
      load_codeCard_like_leadLink(
        card.withLink(childInput, nest, index),
      )
    })
  })
}

export function load_codeCard_like_free(load: MeshLoad): void {}

export function load_codeCard_like_head(load: MeshLoad): void {}

export function load_codeCard_like_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.DynamicTerm: {
      const index = card.loadLinkIndex(load)
      if (index === 0) {
        card.load_first_dynamicTerm(load, 'name')
      } else {
        card.load_dynamicTerm(load)
      }
      break
    }
    case LinkHint.StaticTerm: {
      const index = card.loadLinkIndex(load)
      if (index === 0) {
        card.load_first_staticTerm(load, 'name')
        return
      }

      const term = card.assumeTermString(load)
      switch (term) {
        case 'head':
          card.load_codeCard_head(load)
          break
        case 'like':
          card.load_codeCard_like_like(load)
          break
        case 'list':
          card.load_codeCard_like_list(load)
          break
        case 'mesh':
          card.load_codeCard_like_mesh(load)
          break
        case 'take':
          card.load_codeCard_like_take(load)
          break
        case 'free':
          card.load_codeCard_like_free(load)
          break
        case 'term':
          card.load_codeCard_like_term(load)
          break
        case 'link':
          // card.load_codeCard_link(load)
          break
        case 'task':
          card.load_codeCard_task(load)
          break
        case 'stem':
          card.load_codeCard_stem(load)
          break
        default:
          card.throwError(card.generateUnhandledTermCaseError(load))
      }
      break
    }
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

export function load_codeCard_like_like(load: MeshLoad): void {}

export function load_codeCard_like_list(load: MeshLoad): void {}

export function load_codeCard_like_mesh(load: MeshLoad): void {}

export function load_codeCard_like_take(load: MeshLoad): void {}

export function load_codeCard_like_term(load: MeshLoad): void {}
