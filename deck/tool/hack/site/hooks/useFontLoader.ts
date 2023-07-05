import FontFaceObserver from 'fontfaceobserver'
import { useConfiguration } from './useConfiguration'
import { loadDynamicFont } from '~/utils/loadFont'
import { useCallback, useState } from 'react'

export function useDynamicFontLoader() {
  const config = useConfiguration()

  const loadFont = useCallback(
    async (name: string, path: string | Array<string>) => {
      if (config.data.fonts.families[name].loaded) {
        return
      }

      try {
        await loadDynamicFont(name, path)

        config.set({
          fonts: {
            families: {
              [name]: {
                loaded: true,
              },
            },
          },
        })
      } catch (e) {
        console.log(e)
      }
    },
    [config],
  )

  return loadFont
}

let i = 1

export function useHostedFontLoader() {
  const config = useConfiguration()

  const [loading, setLoading] = useState({})

  const loadFont = useCallback(
    async (name: string) => {
      if (name in loading) {
        return true
      }

      setLoading(l => ({ ...l, [name]: i++ }))

      try {
        const font = new FontFaceObserver(name)
        await font.load(null, 30000)

        config.set({
          fonts: {
            families: {
              [name]: {
                loaded: true,
              },
            },
          },
        })

        return true
      } catch {
        return false
      }
    },
    [config, loading],
  )

  return loadFont
}
