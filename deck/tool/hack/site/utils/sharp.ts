import sharp from 'sharp'
import { ResizeImagePropsType } from './image'

export async function resizeImage(
  path: string,
  { width, height, constraint }: ResizeImagePropsType,
) {
  const props: Record<string, unknown> = {}

  if (width) {
    props.width = width
  }

  if (height) {
    props.height = height
  }

  if (constraint) {
    props.fit = constraint
  }

  return await sharp(path).resize(props).toBuffer()
}
