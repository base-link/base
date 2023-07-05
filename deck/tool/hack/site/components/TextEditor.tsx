import Editor from '@monaco-editor/react'
import React from 'react'
import styled from 'styled-components'
import draculaTheme from '~/configurations/dracula.monaco.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setEditorTheme(monaco: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  monaco.editor.defineTheme('dracula', draculaTheme)
}

type TextEditorPropsType = {
  defaultLanguage: string
  height: string | number
  lineNumbers?: boolean
  onChange?: (string?: string) => void
  readOnly?: boolean
  value?: string
}

const Container = styled.div(props => ({
  background: props.theme.colors.black,
  marginBottom: 16,
  marginTop: 16,
  paddingBottom: 16,
  paddingLeft: 16,
  paddingTop: 16,
}))

export default function TextEditor({
  height,
  defaultLanguage,
  onChange,
  lineNumbers,
  readOnly,
  value,
}: TextEditorPropsType) {
  return (
    <Container>
      <Editor
        height={height}
        theme="dracula"
        value={value}
        defaultLanguage={defaultLanguage}
        beforeMount={setEditorTheme}
        onChange={onChange}
        options={{
          acceptSuggestionOnEnter: 'off',
          autoClosingBrackets: 'always',
          contextmenu: false,
          cursorStyle: 'line',
          fontSize: 16,
          hover: {
            enabled: false,
          },
          minimap: {
            enabled: false,
          },
          parameterHints: {
            enabled: false,
          },
          quickSuggestions: {
            comments: false,
            other: false,
            strings: false,
          },
          readOnly,
          scrollbar: {
            alwaysConsumeMouseWheel: false,
            // handleMouseWheel: false,
          },
          suggestOnTriggerCharacters: false,
          tabCompletion: 'off',
          tabSize: 2,
          wordBasedSuggestions: false,
          wordWrap: 'off',
          ...(lineNumbers
            ? {}
            : {
                folding: false,
                glyphMargin: false,
                lineDecorationsWidth: 0,
                lineNumbers: 'off',
                lineNumbersMinChars: 0,
              }),
        }}
      />
    </Container>
  )
}
