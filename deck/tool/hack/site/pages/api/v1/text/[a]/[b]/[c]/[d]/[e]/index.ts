import { NextApiRequest, NextApiResponse } from 'next'
import loadJSON from '~/utils/loadJSON'
import MAP from '~/dependencies/gen-a-b-c-d-e-f'
import applyRateLimit from '~/utils/rateLimit'
import { getSortedQueryParams } from '~/utils/queryParams'
import _ from 'lodash'

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
  const d = String(req.query.d)
  const e = String(req.query.e)
  const slug = [`data/text/${a}/${b}/${c}/${d}/${e}`, query]
    .filter(x => x)
    .join('?')

  const path = MAP[slug]

  if (!path) {
    return res.status(404).json({ error: 'not found' })
  }

  const data = loadJSON(path)

  res.json(data)
}
