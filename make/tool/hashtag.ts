import { Link, SiteProcessInputType, code } from '~'

export function resolveHashtagAsNumber(
  input: SiteProcessInputType,
): number | undefined {
  let hashtag = code.assumeLink(input, Link.Hashtag)

  switch (hashtag.system) {
    case 'b':
      return parseInt(hashtag.code, 2)
    case 'x':
      return parseInt(hashtag.code, 16)
    case 'o':
      return parseInt(hashtag.code, 8)
    case 'h':
      return parseInt(hashtag.code, 16)
    case 'd':
      return parseInt(hashtag.code, 10)
    case 's':
      return parseInt(hashtag.code, 60)
    case 't':
      return parseInt(hashtag.code, 12)
    default:
      // this is caught earlier
      code.throwError(code.generateInvalidCompilerStateError())
  }
}
