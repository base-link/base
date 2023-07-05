/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

export function getTermType(meta: {
  meaning: { action: any; fusion: any; manner: any; object: any }
}) {
  if (meta.meaning.action) {
    return 'action'
  }
  if (meta.meaning.object) {
    return 'object'
  }
  if (meta.meaning.manner) {
    return 'manner'
  }
  if (meta.meaning.fusion) {
    return 'fusion'
  }
}
