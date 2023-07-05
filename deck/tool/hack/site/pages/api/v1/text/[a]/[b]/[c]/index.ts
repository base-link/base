import { NextApiRequest, NextApiResponse } from 'next'
import loadJSON from '~/utils/loadJSON'
import MAP from '~/dependencies/gen-a-b-c-d'
import applyRateLimit from '~/utils/rateLimit'
import _ from 'lodash'
import { getSortedQueryParams } from '~/utils/queryParams'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (await applyRateLimit(req, res)) {
    return
  }

  const query = getSortedQueryParams(
    _.pick(req.query, ['diacritics', 'pronunciation']) as Record<
      string,
      string
    >,
  )

  const a = String(req.query.a)
  const b = String(req.query.b)
  const c = String(req.query.c)
  const slug = [`data/text/${a}/${b}/${c}`, query]
    .filter(x => x)
    .join('?')

  const path = MAP[slug]

  if (!path) {
    return res.status(404).json({ error: 'not found' })
  }

  const data = loadJSON(path)

  res.json(data)
}
