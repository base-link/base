/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from 'next'
import loadJSON from '~/utils/loadJSON'
import getSymbolData, {
  FontType,
  SymbolBasicType,
} from '~/utils/symbol'
import pathResolver from 'path'
import applyRateLimit from '~/utils/rateLimit'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await applyRateLimit(req, res)
  } catch {
    res.status(429).json({ error: 'Rate limit exceeded' })
    return
  }

  const slug: string =
    (Array.isArray(req.query.collection)
      ? req.query.collection[0]
      : req.query.collection) ?? ''

  const symbolsMap = loadJSON(
    pathResolver.resolve('./configurations/unicode.symbol.json'),
  ) as unknown as Record<string, SymbolBasicType>

  const glyphFontMap = loadJSON(
    pathResolver.resolve('./configurations/glyph.font.json'),
  ) as unknown as Record<string, Array<number>>

  const symbol = symbolsMap[slug]
  const fontIndices = glyphFontMap[slug]
  const fontsIndex = loadJSON(
    pathResolver.resolve('./configurations/font.google.index.json'),
  ) as unknown as Array<FontType>
  const allFonts = fontIndices?.map(i => fontsIndex[i]) ?? []

  const fonts = allFonts.slice(0, 5)

  const data = getSymbolData(symbol, fonts)
  res.json(data)
}
