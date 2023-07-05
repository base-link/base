import formidable, { File } from 'formidable'
import fs from 'node:fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'
import { convertDocXToMarkdown } from '~/utils/pandoc'
import applyRateLimit from '~/utils/rateLimit'

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
            "An error occurred while uploading the document, you can try again if you'd like.",
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
          .send('An error occurred while converting the document.')
      }
      finish(null)
    })
  })
}

const saveFile = async (file: File): Promise<string> => {
  const out = await convertDocXToMarkdown(file.filepath)
  await fs.unlink(file.filepath)
  return out
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
