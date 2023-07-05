/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import _ from 'lodash'
import clearDiacritics from '@lancejpollard/clear-diacritics.js'

export const slugify = (str: string): string =>
  clearDiacritics(str)
    .replace(/\s+/g, '+')
    .replace(/'/g, '')
    .toLowerCase()

export const titleize = (str: string) => _.startCase(_.toLower(str))
