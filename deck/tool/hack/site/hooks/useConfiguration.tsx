import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import _ from 'lodash'
import { NestedObjectType } from '~/utils/type.config'

type ConfigurationContextType = {
  data: Configuration
  set: (updates: NestedObjectType) => void
}

export interface Configuration {}

export const ConfigurationContext = React.createContext<
  ConfigurationContextType | undefined
>(undefined)

export function ConfigurationProvider({ config, children }: PropsType) {
  const [data, setConfiguration] = useState(config)

  const set = useCallback((updates: NestedObjectType) => {
    setConfiguration(c => _.merge({}, c, updates) as Configuration)
  }, [])

  const value = useMemo(
    () => ({
      data,
      set,
    }),
    [data, set],
  )

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  )
}

type PropsType = {
  children: React.ReactNode
  config: Configuration
}

export function useConfiguration(): ConfigurationContextType {
  return useContext(ConfigurationContext) as ConfigurationContextType
}

export function useConfigurationScope(scope: string) {
  const updates = useMemo(() => ({ scope }), [scope])
  useConfigurationSettings(updates)
}

export function useConfigurationSettings(updates: NestedObjectType) {
  const config = useConfiguration()

  useEffect(() => {
    config.set(updates)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updates])
}
