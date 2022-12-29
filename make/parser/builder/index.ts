import { api, LexerTokenType } from '~'

import {
  Lexer,
  LexerResultType,
  LexerTokenBaseType,
} from '../tokenizer/index.js'

export enum Tree {
  Boolean = 'tree-boolean',
  Decimal = 'tree-decimal',
  Handle = 'tree-handle',
  Hashtag = 'tree-hashtag',
  Index = 'tree-index',
  Module = 'tree-module',
  Path = 'tree-path',
  Plugin = 'tree-plugin',
  SignedInteger = 'tree-signed-integer',
  String = 'tree-string',
  Term = 'tree-term',
  Text = 'tree-text',
  UnsignedInteger = 'tree-unsigned-integer',
}

export type TreeBooleanType = {
  like: Tree.Boolean
  value: boolean
}

export type TreeDecimalType = LexerTokenBaseType & {
  like: Tree.Decimal
  value: number
}

export type TreeHandleType = {
  element: Array<
    | TreePathType
    | TreeTermType
    | TreeTextType
    | TreeHandleType
    | TreeUnsignedIntegerType
    | TreeSignedIntegerType
    | TreeHashtagType
    | TreeDecimalType
    | TreeStringType
  >
  like: Tree.Handle
  term: TreeTermType
}

export type TreeHashtagType = LexerTokenBaseType & {
  code: string
  like: Tree.Hashtag
  system: string
}

export type TreeIndexType = {
  element: TreeHandleType | TreeTermType | TreePathType
  like: Tree.Index
}

export type TreeMappingType = {
  'tree-boolean': TreeBooleanType
  'tree-decimal': TreeDecimalType
  'tree-handle': TreeHandleType
  'tree-hashtag': TreeHashtagType
  'tree-index': TreeIndexType
  'tree-module': TreeModuleType
  'tree-path': TreePathType
  'tree-plugin': TreePluginType
  'tree-signed-integer': TreeSignedIntegerType
  'tree-string': TreeStringType
  'tree-term': TreeTermType
  'tree-text': TreeTextType
  'tree-unsigned-integer': TreeUnsignedIntegerType
}

export type TreeModuleType = {
  element: Array<
    | TreePathType
    | TreeTermType
    | TreeTextType
    | TreeHandleType
    | TreeUnsignedIntegerType
    | TreeSignedIntegerType
    | TreeHashtagType
    | TreeDecimalType
    | TreeStringType
  >
  like: Tree.Module
}

export type TreeNodeType =
  | TreeTermType
  | TreeStringType
  | TreeHandleType
  | TreeUnsignedIntegerType
  | TreeTextType
  | TreePluginType
  | TreeIndexType
  | TreeDecimalType
  | TreeHashtagType
  | TreePathType
  | TreeModuleType

export type TreePathType = {
  like: Tree.Path
  segment: Array<TreeTermType | TreePathType>
}

export type TreePluginType = {
  element: TreeHandleType | TreeTermType | TreePathType
  like: Tree.Plugin
  size: number
}

export type TreeResultType = LexerResultType & {
  parseTree: TreeHandleType
}

export type TreeSignedIntegerType = LexerTokenBaseType & {
  like: Tree.SignedInteger
  value: number
}

export type TreeStringType = Omit<
  LexerTokenBaseType,
  'text'
> & {
  like: Tree.String
  value: string
}

export type TreeTermType = {
  dive: boolean
  guard: boolean
  key: boolean
  like: Tree.Term
  segment: Array<TreeStringType | TreeTermType | TreePathType>
}

export type TreeTextType = {
  like: Tree.Text
  link: Array<TreeStringType | TreePluginType>
}

export type TreeType<T extends Tree> = TreeMappingType[T]

export type TreeUnsignedIntegerType = LexerTokenBaseType & {
  like: Tree.UnsignedInteger
  value: number
}

export function buildParseTree(
  input: LexerResultType,
): TreeResultType {
  const start: TreeModuleType = {
    element: [],
    like: Tree.Module,
  }

  const result = start
  const stack: Array<TreeNodeType> = [start]

  let nestingNodeList: Array<TreeNodeType> = []
  let nesting = 0
  let i = 0
  let token: LexerTokenType<Lexer>

  console.log(api.prettifyJSON(input.token))

  while (i < input.token.length) {
    const t = input.token[i]
    if (!t) {
      continue
    }

    token = t

    switch (token.like) {
      case Lexer.CloseEvaluation: {
        stack.pop()
        break
      }
      case Lexer.CloseInterpolation: {
        stack.pop()
        break
      }
      case Lexer.CloseParenthesis: {
        break
      }
      case Lexer.CloseText: {
        break
      }
      case Lexer.Comma: {
        stack.pop()
        break
      }
      case Lexer.Comment: {
        break
      }
      case Lexer.Decimal: {
        break
      }
      case Lexer.Hashtag: {
        break
      }
      case Lexer.Line: {
        break
      }
      case Lexer.OpenEvaluation: {
        break
      }
      case Lexer.OpenIndentation: {
        break
      }
      case Lexer.OpenInterpolation: {
        const next = peek()

        if (next) {
          if (next.like === Lexer.TermPath) {
            consume()
            handleTermPath(token)
          }
        }

        const nestedPlugin: TreePluginType = {
          element: ,
          like: Tree.Plugin,
          size: token.text.length,
        }
        const childNode: TreeType<Tree.Plugin> = {
          like: Tree.Plugin,
          nest: nestedHandle,
          size: token.text.length,
        }
        const node = read()

        if (node) {
          switch (node.like) {
            case Tree.Term:
              node.segment.push()
              break
          }
        }
        if (node && node.like === Tree.Handle) {
          node.line.push(nestedHandle)
          stack.push(nestedHandle)
        }
        break
      }
      case Lexer.OpenNesting: {
        break
      }
      case Lexer.OpenParenthesis: {
        break
      }
      case Lexer.OpenText: {
        break
      }
      case Lexer.Path: {
        break
      }
      case Lexer.SignedInteger: {
        break
      }
      case Lexer.String: {
        break
      }
      case Lexer.TermPath: {
        handleTermPath(token)
        break
      }
      case Lexer.UnsignedInteger: {
        break
      }
    }

    function handleTermPath(token: LexerTokenType<Lexer>) {
      const node = read()

      if (!node) {
        return
      }

      const parts = token.text.split(/\//)
      const path: Array<TreeType<Tree.Term>> = []

      for (const step of parts) {
        const dive = Boolean(step.match(/\*/))
        const guard = Boolean(step.match(/\?/))
        const key = Boolean(step.match(/~/))
        const name = step.replace(/[\*\~\?]/g, '')
        path.push({
          dive,
          guard,
          key,
          like: Tree.Term,
          segment: [
            {
              value: name,
              ...api.omit(token, ['text']),
              like: Tree.String,
            },
          ],
        })
      }

      let child: TreeTermType | TreePathType

      if (path.length === 1 && path[0]) {
        child = path[0]
      } else {
        child = {
          like: Tree.Path,
          segment: path,
        }
      }

      if (
        node.like === Tree.Handle ||
        node.like === Tree.Module
      ) {
        if (child.like === Tree.Term) {
          const handle: TreeHandleType = {
            element: [],
            like: Tree.Handle,
            term: child,
          }
          node.element.push(handle)
          stack.push(handle)
        } else {
          node.element.push(child)
        }
      }

      const next = peek()

      if (!next) {
        return
      }

      switch (next.like) {
        case Lexer.OpenInterpolation: {
          stack.push(child)
          break
        }
      }
    }

    i++
  }

  function read() {
    return stack[stack.length - 1]
  }

  function peek(amount = 1) {
    return input.token[i + amount]
  }

  function consume(amount = 1) {
    i += amount
    const t = input.token[i]
    if (t) {
      token = t
    }
  }

  console.log(api.prettifyJSON(result))

  return {
    ...input,
    parseTree: result,
  }
}
