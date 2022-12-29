import type { SiteErrorConfigType, SiteErrorInputType } from '~'

export const ERROR: Record<string, SiteErrorConfigType> = [
  {
    code: '0002',
    note: ({ name, scope }: SiteErrorInputType) =>
      scope
        ? `We haven't implemented handling the term \`${name}\` within \`${scope}\` yet.`
        : `We haven't implemented handling the term \`${name}\` yet.`,
  },
  {
    code: '0001',
    note: ({ term }: SiteErrorInputType) =>
      `We haven't implemented handling term interpolation yet, for ${term}.`,
  },
].reduce(errorReducer, {})

function errorReducer(
  m: Record<string, SiteErrorConfigType>,
  x: SiteErrorConfigType,
) {
  return {
    ...m,
    [x.code]: {
      isError: true,
      ...x,
    },
  }
}
