import TurndownService from 'turndown'
import formidable, { File } from 'formidable'
import fs from 'node:fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'
import applyRateLimit from '~/utils/rateLimit'

const turndownService = new TurndownService()

export const config = {
  api: {
    bodyParser: false,
  },
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm()
  return new Promise(finish => {
    form.parse(req, async function (err, fields, files) {
      if (err) {
        res
          .status(404)
          .send(
            "An error occurred while uploading the HTML, you can try again if you'd like.",
          )
        finish(null)
        return
      }
      try {
        const out = await saveFile(files.file as File)
        res.status(201).send(out)
      } catch (e) {
        res
          .status(404)
          .send(
            'An error occurred while converting the HTML to markdown.',
          )
      }
      finish(null)
    })
  })
}

const saveFile = async (file: File): Promise<string> => {
  const html = await fs.readFile(file.filepath, 'utf-8')
  const markdown = turndownService.turndown(html)
  await fs.unlink(file.filepath)
  return markdown
}

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

  req.method === 'POST'
    ? await post(req, res)
    : res.status(404).send('')
}
