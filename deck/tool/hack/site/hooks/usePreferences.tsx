/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useContext, useCallback } from 'react'
import IS_SERVER from '~/utils/isServer'

type PreferencesContextType = {
  get: (key: string) => unknown
  set: (key: string, value: unknown) => void
}

const set = (key: string, value: unknown) => {
  localStorage.setItem(`preferences.${key}`, JSON.stringify(value))
  defaultConfig[key] = value
}

const get = (key: string): unknown => {
  if (key in defaultConfig) {
    return defaultConfig[key]
  }

  if (IS_SERVER) {
    return
  }

  const storedValue = localStorage.getItem(
    `preferences.${key}`,
  ) as string

  const value = storedValue ? JSON.parse(storedValue) : undefined

  defaultConfig[key] = value

  return value
}

export const PreferencesContext =
  React.createContext<PreferencesContextType>({
    get,
    set,
  })

type PreferencesProviderPropsType = {
  children: React.ReactNode
}

let defaultConfig: Record<string, unknown> = {}

export function PreferencesProvider({
  children,
}: PreferencesProviderPropsType) {
  return (
    <PreferencesContext.Provider value={{ get, set }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  return useContext(PreferencesContext)
}
