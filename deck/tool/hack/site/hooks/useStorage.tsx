import { flatten } from 'flat'
import React, { useContext, useMemo } from 'react'
import IS_SERVER from '~/utils/isServer'
import {
  NestedObjectType,
  NestedObjectValueType,
} from '~/utils/type.config'

type StorageContextType = {
  data: NestedObjectType
  set: (value: NestedObjectType) => void
}

type StorableType = {
  [key: string]: StorableType | string
}

type StorageProviderPropsType = {
  children: React.ReactNode
  storable: StorableType
}

const data: NestedObjectType = {}

export const StorageContext = React.createContext<StorageContextType>({
  data,
  set: (value: NestedObjectType) => {},
})

type NestedStringType = {
  [key: string]: string | NestedStringType
}

type StringRecordType = {
  [key: string]: string
}

export function StorageProvider({
  storable,
  children,
}: StorageProviderPropsType) {
  const longToShort = useMemo(
    () => flatten(storable, { safe: true }),
    [storable],
  ) as StringRecordType
  const shortToLong = useMemo(() => shorten(longToShort), [longToShort])

  const value = useMemo(() => {
    const setFlat = (key: string, value: NestedObjectValueType) => {
      // don't save if we don't know how.
      if (!longToShort[key]) {
        return
      }

      const s = longToShort[key]

      localStorage.setItem(`seed.${s}`, JSON.stringify(value))
      data[key] = value
    }

    const getFlat = (key: string): NestedObjectValueType => {
      if (IS_SERVER) {
        return null
      }

      if (key in data) {
        return data[key]
      }

      const s = longToShort[key]

      const storedValue = localStorage.getItem(`seed.${s}`)

      if (typeof storedValue === 'string') {
        const value = JSON.parse(storedValue) as NestedObjectValueType
        data[key] = value

        return value
      }
    }

    for (const s in shortToLong) {
      getFlat(shortToLong[s])
    }

    const set = (updates: NestedObjectType) => {
      const flattened: Record<string, NestedObjectValueType> = flatten(
        updates,
        {
          safe: true,
        },
      )

      for (const key in flattened) {
        setFlat(key, flattened[key])
      }
    }

    return { data, set }
  }, [longToShort, shortToLong])

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  )
}

export function useStorage() {
  return useContext(StorageContext)
}

function shorten(obj: StringRecordType) {
  const result: StringRecordType = {}
  for (const key in obj) {
    result[obj[key]] = key
  }
  return result
}

function nestObject(obj: NestedObjectType) {
  const record: NestedObjectType = {}

  for (const k in obj) {
    const parts = k.split('.')
    let i = 0
    let node = record
    while (i < parts.length - 1) {
      let p = parts[i++]
      node = (node[p] = node[p] ?? {}) as NestedObjectType
    }
    let p = parts.pop()
    node[p ?? ''] = obj[k]
  }

  return record
}
