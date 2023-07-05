/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import formidable, { File } from 'formidable'
import fs, { mkdtemp } from 'node:fs/promises'
import fsBasic from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import applyRateLimit from '~/utils/rateLimit'
import archiver from 'archiver'
import opentype from 'opentype.js'
import cuid from '@paralleldrive/cuid2'

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
            "An error occurred while uploading the font, you can try again if you'd like.",
          )
        finish(null)
        return
      }
      try {
        const tmpPath = await saveFile(files.file as File)
        const inStream = fsBasic.createReadStream(tmpPath)
        const stat = await fs.stat(tmpPath)

        res.writeHead(200, {
          'Content-Length': stat.size,
          'Content-Type': 'application/zip',
        })

        inStream.pipe(res).on('close', async () => {
          await fs.unlink(tmpPath)
        })
      } catch (e) {
        res
          .status(404)
          .send(
            'An error occurred while extracting the SVGs from the font.',
          )
      }
      finish(null)
    })
  })
}

const saveFile = async (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const tmpDir = await mkdtemp(`/tmp/${cuid.createId()}`)
    const tmpPath = `${tmpDir}/${cuid.createId()}.zip`

    const output = fsBasic.createWriteStream(tmpPath)

    const archive = archiver('zip', {
      zlib: { level: 7 }, // Sets the compression level.
    })

    archive.on('error', async err => {
      await fs.unlink(tmpPath)
      reject(err)
    })

    output.on('close', () => {
      resolve(tmpPath)
    })

    // pipe archive data to the output file
    archive.pipe(output)

    const content = await fs.readFile(file.filepath)
    const font = opentype.parse(content.buffer)

    let i = 0
    while (i < font.glyphs.length) {
      const glyph = font.glyphs.get(i++)
      if (glyph.unicode == null) {
        continue
      }

      const unicode = glyph.unicode
        .toString(16)
        .padStart(4, '0')
        .toUpperCase()

      const { x1, x2, y1, y2 } = glyph.getBoundingBox()
      const w = x2 - x1
      const h = y2 - y1
      const svgDocument = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${x1} ${y1} ${w} ${h}">
  ${glyph.toSVG()}
</svg>`

      archive.append(svgDocument, { name: `${unicode}.svg` })
    }

    // wait for streams to complete
    archive.finalize()

    await fs.unlink(file.filepath)
  })
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
