import { ParsedUrlQuery } from 'querystring'
import { SettingType, SettingValueType } from './type.text'

export function finalizeQueryParams(
  originalParams: ParsedUrlQuery,
  settings: Array<SettingType>,
  acceptedParams: Array<string>,
): ParsedUrlQuery {
  const params: ParsedUrlQuery = {}
  const exclusions: Array<string> = []

  for (const setting of settings) {
    if (setting.value == null) {
      exclusions.push(setting.name)
    } else {
      params[setting.name] = serializeSettingValue(setting.value)
    }
  }

  for (const name in originalParams) {
    if (name in params) {
      continue
    }

    if (exclusions.includes(name)) {
      continue
    }

    if (!acceptedParams.includes(name)) {
      continue
    }

    params[name] = originalParams[name]
  }

  return params
}

export function generateUrl(
  path: string,
  query: ParsedUrlQuery,
): string {
  const params: Array<string> = []

  for (const key in query) {
    params.push(`${key}=${query[key]}`)
  }

  if (params.length) {
    return `${path.split('?')[0]}?${params.sort().join('&')}`
  } else {
    return `${path.split('?')[0]}`
  }
}

export function getSortedQueryParams(params: Record<string, string>) {
  const array: Array<string> = []
  for (const key in params) {
    array.push(`${key}=${params[key]}`)
  }
  return array.length ? array.sort().join('&') : undefined
}

export function serializeSettingValue(value: SettingValueType): string {
  if (Array.isArray(value)) {
    return value.concat().sort().join(',')
  }

  return String(value)
}
