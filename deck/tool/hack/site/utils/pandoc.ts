/* eslint-disable @typescript-eslint/no-explicit-any */
import nodePandoc from 'node-pandoc'

export async function convertDocXToMarkdown(
  docPath: string,
): Promise<string> {
  return new Promise((res, rej) => {
    const args = '-f docx -t markdown'

    nodePandoc(docPath, args, (err: any, result: string) => {
      if (err) {
        return rej(err)
      }

      res(result)
    })
  })
}
