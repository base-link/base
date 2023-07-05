import formidable, { File } from 'formidable'
import fs from 'node:fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'
import applyRateLimit from '~/utils/rateLimit'
import { resizeImage } from '~/utils/sharp'
import {
  ResizeImageConstraintType,
  ResizeImagePropsType,
} from '~/utils/image'

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
            "An error occurred while uploading the image, you can try again in a few seconds if you'd like.",
          )
        finish(null)
        return
      }
      try {
        const opts: ResizeImagePropsType = {}
        if (fields.width) {
          opts.width = parseFloat(String(fields.width))
        }
        if (fields.height) {
          opts.height = parseFloat(String(fields.height))
        }
        if (fields.constraint) {
          opts.constraint = String(
            fields.constraint,
          ) as ResizeImageConstraintType
        }
        const out = await saveFile(files.file as File, opts)
        res.status(201).send(out)
      } catch (e) {
        res
          .status(404)
          .send('An error occurred while resizing the image.')
      }
      finish(null)
    })
  })
}

const saveFile = async (
  file: File,
  opts: ResizeImagePropsType,
): Promise<Buffer> => {
  const out = await resizeImage(file.filepath, opts)
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
