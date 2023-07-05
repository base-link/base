export const RESIZE_IMAGE_CONSTRAINT: Record<string, string> = {
  contain: 'Contain',
  cover: 'Cover',
  fill: 'Fill',
  inside: 'Inside',
  outside: 'Outside',
}

export const RESIZE_IMAGE_CONSTRAINT_LIST = [
  { label: 'None', value: '' },
  { label: 'Contain', value: 'contain' },
  { label: 'Cover', value: 'cover' },
  { label: 'Fill', value: 'fill' },
  { label: 'Inside', value: 'inside' },
  { label: 'Outside', value: 'outside' },
]

export type ResizeImageConstraintType =
  keyof typeof RESIZE_IMAGE_CONSTRAINT

export type ResizeImagePropsType = {
  constraint?: ResizeImageConstraintType
  height?: number
  width?: number
}
