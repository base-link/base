import React, { useState, useEffect, useContext } from 'react'
import FontFaceObserver from 'fontfaceobserver'
import FONT_LOADERS, { FontDataType } from '~/configurations/fonts'

export const FontContext = React.createContext(
  Object.keys(FONT_LOADERS).reduce<Record<string, boolean>>((m, x) => {
    m[x] = false
    return m
  }, {}),
)

type FontProviderPropsType = {
  children: React.ReactNode
}

export function FontProvider({ children }: FontProviderPropsType) {
  const state = useFonts(FONT_LOADERS)

  return (
    <FontContext.Provider value={state}>
      {children}
    </FontContext.Provider>
  )
}

export function useFontStates() {
  return useContext(FontContext)
}

export function useFonts(
  allFonts: Record<string, FontDataType>,
  selectedFonts: Array<string> = [],
) {
  const [state, setState] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fonts = selectedFonts.length
      ? selectedFonts.map(name => allFonts[name].concat(name))
      : Object.keys(allFonts).map(name => allFonts[name].concat(name))

    fonts.forEach(([fontName, testString, fontShortName]) => {
      const font = new FontFaceObserver(fontName)
      font
        .load(testString, 30000)
        .catch(e => {
          setState(s => ({ ...s, [fontShortName]: false }))
        })
        .then(e => {
          setState(s => ({ ...s, [fontShortName]: true }))
        })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFonts, selectedFonts.join(':')])

  return state
}

export function useFontsLoaded() {
  const fontStates = useContext(FontContext)
  const values = Object.values(fontStates)
  for (const value of values) {
    if (!value) {
      return false
    }
  }
  return true
}
