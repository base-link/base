import {
  CursorRangeType,
  ErrorType,
  LEXER_TYPE,
  LexerSplitInputType,
  LexerTokenType,
  api,
} from '~'

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
  element?: TreeHandleType | TreeTermType | TreePathType
  like: Tree.Plugin
  size: number
}

export type TreeResultType = LexerSplitInputType & {
  parseTree: TreeModuleType
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
  segment: Array<
    | TreeStringType
    | TreeTermType
    | TreePathType
    | TreePluginType
  >
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

export type TreeWorkListCallbackType = (
  token: LexerTokenType<Lexer>,
) => void

export type TreeWorkListInputType = {
  callback: TreeWorkListCallbackType
  parent: TreeNodeType
}

export function assertLexerGenericType(
  object: unknown,
): asserts object is LexerTokenType<Lexer> {
  if (!api.isLexerGenericType(object)) {
    api.throwError()
  }
}

export function assertLexerType<T extends Lexer>(
  object: unknown,
  like: T,
): asserts object is LexerTokenType<T> {
  if (!api.isLexerType<T>(object, like)) {
    api.throwError()
  }
}

type TreeInputType = LexerSplitInputType & {
  token: LexerTokenType<Lexer>
}

export function buildParseTree(
  input: LexerResultType,
): TreeResultType {
  const start: TreeModuleType = {
    element: [],
    like: Tree.Module,
  }

  let i = 0
  const result = start
  const workList: Array<TreeWorkListCallbackType> = [
    consumeTopLevelType,
  ]

  console.log(api.prettifyJSON(input.tokenList))
  const lists = api.prettifyJSON(segmentIntoLinearTokenLists(input.tokenList))
  const trees = organizeIntoTrees(lists)

  const stack: Array<TreeNodeType> = [start]

  let nestingNodeList: Array<TreeNodeType> = []
  let nesting = 0



  while (i < input.tokenList.length) {
    const token = input.tokenList[i]
    api.assertLexerGenericType(token)

    const work = workList.shift()
    if (!work) {
      i++
      continue
    }

    work(token)
    i++
  }

  function consumeTopLevelType(
    token: LexerTokenType<Lexer>,
  ): void {
    switch (token.like) {
      case Lexer.CloseEvaluation: {
        break
      }
      case Lexer.CloseInterpolation: {
        break
      }
      case Lexer.CloseParenthesis: {
        break
      }
      case Lexer.CloseText: {
        break
      }
      case Lexer.Comma: {
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
        consumeTermPath(token)
        break
      }
      case Lexer.UnsignedInteger: {
        break
      }
    }
  }

  function consumeTermPath(token: LexerTokenType<Lexer>): void {
    if (token.text.match('/')) {
      consumePath(token)
    } else {
      consumeTerm(token)
    }
  }

  function organizeIntoTrees(lists: Array<{ type: string, tokenList: Array<LexerTokenType<Lexer>> }>): Array<{ type: string, tokenList: Array<LexerTokenType<Lexer>> }> {
    lists.forEach(list => {
      switch (list.type) {
        case 'term-collecting':

      }
    })
  }

  function segmentIntoLinearTokenLists(tokenList: Array<LexerTokenType<Lexer>>): Array<{ type: string, tokenList: Array<LexerTokenType<Lexer>> }> {
    let list: Array<LexerTokenType<Lexer>> = []
    const listOfLists: Array<{ type: string, tokenList: Array<LexerTokenType<Lexer>> }> = [ { type: 'start', tokenList: [] } ]
    let state = 'start'
    const stack: Array<string> = []
    function reset(type: string) {
      state = type
      if (state.match(/text|term/)) {
        stack.push(state)
      } else if (stack[stack.length - 1]) {
        // if (stack[stack.length - 1]?.match(/text|term/)) {
        //   stack.pop()
        // }
      }
      if (!list.length) {
        listOfLists.pop()
      }

      list = []
      listOfLists.push({ tokenList: list, type: state })
    }

    function pop() {
      // stack.pop()
      // state = stack[stack.length - 1] ?? 'start'
    }

    function throwError(token: LexerTokenType<Lexer>): void {
      api.throwError(api.generateUnhandledTreeResolver({
        ...input,
        token
      }))
    }

    for (const token of tokenList) {
      switch (state) {
        case 'nest-collecting': {
          switch (token.like) {
            case Lexer.CloseEvaluation: {
              throwError(token)
              break
            }
            case Lexer.CloseInterpolation: {
              throwError(token)
              break
            }
            case Lexer.CloseParenthesis: {
              list.push(token)
              break
            }
            case Lexer.CloseText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Comma: {
              list.push(token)
              break
            }
            case Lexer.Comment: {
              reset('comment-collecting')
              list.push(token)
              break
            }
            case Lexer.Decimal: {
              reset('decimal-collecting')
              list.push(token)
              break
            }
            case Lexer.Hashtag: {
              reset('hashtag-collecting')
              list.push(token)
              break
            }
            case Lexer.Line: {
              list.push(token)
              break
            }
            case Lexer.OpenEvaluation: {
              throwError(token)
              break
            }
            case Lexer.OpenIndentation: {
              list.push(token)
              break
            }
            case Lexer.OpenInterpolation: {
              throwError(token)
              break
            }
            case Lexer.OpenNesting: {
              list.push(token)
              break
            }
            case Lexer.OpenParenthesis: {
              list.push(token)
              break
            }
            case Lexer.OpenText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Path: {
              reset('path-collecting')
              list.push(token)
              break
            }
            case Lexer.SignedInteger: {
              reset('integer-collecting')
              list.push(token)
              break
            }
            case Lexer.String: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.TermPath: {
              reset('term-collecting')
              list.push(token)
              break
            }
            case Lexer.UnsignedInteger: {
              reset('unsigned-integer-collecting')
              list.push(token)
              break
            }
          }
          break
        }
        case 'unsigned-integer-collecting': {
          switch (token.like) {
            case Lexer.CloseEvaluation: {
              throwError(token)
              break
            }
            case Lexer.CloseInterpolation: {
              throwError(token)
              break
            }
            case Lexer.CloseParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.CloseText: {
              throwError(token)
              break
            }
            case Lexer.Comma: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.Comment: {
              reset('comment-collecting')
              list.push(token)
              break
            }
            case Lexer.Decimal: {
              throwError(token)
              break
            }
            case Lexer.Hashtag: {
              throwError(token)
              break
            }
            case Lexer.Line: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenEvaluation: {
              throwError(token)
              break
            }
            case Lexer.OpenIndentation: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenInterpolation: {
              throwError(token)
              break
            }
            case Lexer.OpenNesting: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenText: {
              throwError(token)
              break
            }
            case Lexer.Path: {
              throwError(token)
              break
            }
            case Lexer.SignedInteger: {
              throwError(token)
              break
            }
            case Lexer.String: {
              throwError(token)
              break
            }
            case Lexer.TermPath: {
              throwError(token)
              break
            }
            case Lexer.UnsignedInteger: {
              throwError(token)
              break
            }
          }
          break
        }
        case 'text-collecting': {
          switch (token.like) {
            case Lexer.CloseEvaluation: {
              list.push(token)
              break
            }
            case Lexer.CloseInterpolation: {
              list.push(token)
              pop()
              break
            }
            case Lexer.CloseParenthesis: {
              pop()
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.CloseText: {
              list.push(token)
              pop()
              break
            }
            case Lexer.Comma: {
              pop()
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.Comment: {
              reset('comment-collecting')
              list.push(token)
              break
            }
            case Lexer.Decimal: {
              reset('decimal-collecting')
              list.push(token)
              break
            }
            case Lexer.Hashtag: {
              reset('hashtag-collecting')
              list.push(token)
              break
            }
            case Lexer.Line: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenEvaluation: {
              list.push(token)
              break
            }
            case Lexer.OpenIndentation: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenInterpolation: {
              list.push(token)
              break
            }
            case Lexer.OpenNesting: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenText: {
              list.push(token)
              break
            }
            case Lexer.Path: {
              reset('path-collecting')
              list.push(token)
              break
            }
            case Lexer.SignedInteger: {
              reset('signed-integer-collecting')
              list.push(token)
              break
            }
            case Lexer.String: {
              list.push(token)
              break
            }
            case Lexer.TermPath: {
              reset('term-collecting')
              list.push(token)
              break
            }
            case Lexer.UnsignedInteger: {
              reset('unsigned-integer-collecting')
              list.push(token)
              break
            }
          }
          break
        }
        case 'signed-integer-collecting': {
          switch (token.like) {
            case Lexer.CloseEvaluation: {
              throwError(token)
              break
            }
            case Lexer.CloseInterpolation: {
              throwError(token)
              break
            }
            case Lexer.CloseParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.CloseText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Comma: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.Comment: {
              reset('comment-collecting')
              list.push(token)
              break
            }
            case Lexer.Decimal: {
              reset('decimal-collecting')
              list.push(token)
              break
            }
            case Lexer.Hashtag: {
              reset('hashtag-collecting')
              list.push(token)
              break
            }
            case Lexer.Line: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenEvaluation: {
              throwError(token)
              break
            }
            case Lexer.OpenIndentation: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenInterpolation: {
              throwError(token)
              break
            }
            case Lexer.OpenNesting: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenText: {
              throwError(token)
              break
            }
            case Lexer.Path: {
              throwError(token)
              break
            }
            case Lexer.SignedInteger: {
              throwError(token)
              break
            }
            case Lexer.String: {
              throwError(token)
              break
            }
            case Lexer.TermPath: {
              throwError(token)
              break
            }
            case Lexer.UnsignedInteger: {
              throwError(token)
              break
            }
          }
          break
        }
        case 'comment-collecting': {
          switch (token.like) {
            case Lexer.CloseEvaluation: {
              throwError(token)
              break
            }
            case Lexer.CloseInterpolation: {
              throwError(token)
              break
            }
            case Lexer.CloseParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.CloseText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Comma: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.Comment: {
              reset('comment-collecting')
              list.push(token)
              break
            }
            case Lexer.Decimal: {
              reset('decimal-collecting')
              list.push(token)
              break
            }
            case Lexer.Hashtag: {
              reset('hashtag-collecting')
              list.push(token)
              break
            }
            case Lexer.Line: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenEvaluation: {
              list.push(token)
              break
            }
            case Lexer.OpenIndentation: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenInterpolation: {
              list.push(token)
              break
            }
            case Lexer.OpenNesting: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Path: {
              reset('path-collecting')
              list.push(token)
              break
            }
            case Lexer.SignedInteger: {
              reset('integer-collecting')
              list.push(token)
              break
            }
            case Lexer.String: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.TermPath: {
              list.push(token)
              break
            }
            case Lexer.UnsignedInteger: {
              reset('unsigned-integer-collecting')
              list.push(token)
              break
            }
          }
          break
        }
        case 'path-collecting': {
          switch (token.like) {
            case Lexer.CloseEvaluation: {
              list.push(token)
              break
            }
            case Lexer.CloseInterpolation: {
              list.push(token)
              break
            }
            case Lexer.CloseParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.CloseText: {
              list.push(token)
              break
            }
            case Lexer.Comma: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.Comment: {
              reset('comment-collecting')
              list.push(token)
              break
            }
            case Lexer.Decimal: {
              reset('decimal-collecting')
              list.push(token)
              break
            }
            case Lexer.Hashtag: {
              reset('hashtag-collecting')
              list.push(token)
              break
            }
            case Lexer.Line: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenEvaluation: {
              list.push(token)
              break
            }
            case Lexer.OpenIndentation: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenInterpolation: {
              list.push(token)
              break
            }
            case Lexer.OpenNesting: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenText: {
              list.push(token)
              break
            }
            case Lexer.Path: {
              list.push(token)
              break
            }
            case Lexer.SignedInteger: {
              reset('integer-collecting')
              list.push(token)
              break
            }
            case Lexer.String: {
              list.push(token)
              break
            }
            case Lexer.TermPath: {
              throwError(token)
              break
            }
            case Lexer.UnsignedInteger: {
              reset('unsigned-integer-collecting')
              list.push(token)
              break
            }
          }
          break
        }
        case 'hashtag-collecting': {
          switch (token.like) {
            case Lexer.CloseEvaluation: {
              list.push(token)
              break
            }
            case Lexer.CloseInterpolation: {
              list.push(token)
              break
            }
            case Lexer.CloseParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.CloseText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Comma: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.Comment: {
              reset('comment-collecting')
              list.push(token)
              break
            }
            case Lexer.Decimal: {
              reset('decimal-collecting')
              list.push(token)
              break
            }
            case Lexer.Hashtag: {
              reset('hashtag-collecting')
              list.push(token)
              break
            }
            case Lexer.Line: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenEvaluation: {
              list.push(token)
              break
            }
            case Lexer.OpenIndentation: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenInterpolation: {
              list.push(token)
              break
            }
            case Lexer.OpenNesting: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Path: {
              reset('path-collecting')
              list.push(token)
              break
            }
            case Lexer.SignedInteger: {
              reset('integer-collecting')
              list.push(token)
              break
            }
            case Lexer.String: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.TermPath: {
              list.push(token)
              break
            }
            case Lexer.UnsignedInteger: {
              reset('unsigned-integer-collecting')
              list.push(token)
              break
            }
          }
          break
        }
        case 'decimal-collecting': {
          switch (token.like) {
            case Lexer.CloseEvaluation: {
              list.push(token)
              break
            }
            case Lexer.CloseInterpolation: {
              list.push(token)
              break
            }
            case Lexer.CloseParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.CloseText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Comma: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.Comment: {
              reset('comment-collecting')
              list.push(token)
              break
            }
            case Lexer.Decimal: {
              reset('decimal-collecting')
              list.push(token)
              break
            }
            case Lexer.Hashtag: {
              reset('hashtag-collecting')
              list.push(token)
              break
            }
            case Lexer.Line: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenEvaluation: {
              list.push(token)
              break
            }
            case Lexer.OpenIndentation: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenInterpolation: {
              list.push(token)
              break
            }
            case Lexer.OpenNesting: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Path: {
              reset('path-collecting')
              list.push(token)
              break
            }
            case Lexer.SignedInteger: {
              reset('integer-collecting')
              list.push(token)
              break
            }
            case Lexer.String: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.TermPath: {
              list.push(token)
              break
            }
            case Lexer.UnsignedInteger: {
              reset('unsigned-integer-collecting')
              list.push(token)
              break
            }
          }
          break
        }
        // term started
        case 'term-collecting': {
          switch (token.like) {
            case Lexer.CloseEvaluation: {
              list.push(token)
              break
            }
            case Lexer.CloseInterpolation: {
              list.push(token)
              break
            }
            case Lexer.CloseParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.CloseText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Comma: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.Comment: {
              reset('comment-collecting')
              list.push(token)
              break
            }
            case Lexer.Decimal: {
              reset('decimal-collecting')
              list.push(token)
              break
            }
            case Lexer.Hashtag: {
              reset('hashtag-collecting')
              list.push(token)
              break
            }
            case Lexer.Line: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenEvaluation: {
              list.push(token)
              break
            }
            case Lexer.OpenIndentation: {
              list.push(token)
              break
            }
            case Lexer.OpenInterpolation: {
              list.push(token)
              break
            }
            case Lexer.OpenNesting: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenParenthesis: {
              reset('nest-collecting')
              list.push(token)
              break
            }
            case Lexer.OpenText: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.Path: {
              reset('path-collecting')
              list.push(token)
              break
            }
            case Lexer.SignedInteger: {
              reset('integer-collecting')
              list.push(token)
              break
            }
            case Lexer.String: {
              reset('text-collecting')
              list.push(token)
              break
            }
            case Lexer.TermPath: {
              list.push(token)
              break
            }
            case Lexer.UnsignedInteger: {
              reset('unsigned-integer-collecting')
              list.push(token)
              break
            }
          }
          break
        }
        case 'start': {
          switch (token.like) {
            case Lexer.CloseEvaluation: {
              break
            }
            case Lexer.CloseInterpolation: {
              break
            }
            case Lexer.CloseParenthesis: {
              break
            }
            case Lexer.CloseText: {
              break
            }
            case Lexer.Comma: {
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
              break
            }
            case Lexer.OpenNesting: {
              reset('nest-collecting')
              break
            }
            case Lexer.OpenParenthesis: {
              reset('nest-collecting')
              break
            }
            case Lexer.OpenText: {
              api.throwError('No nesting text parents.')
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
              reset('term-collecting')
              list.push(token)
              break
            }
            case Lexer.UnsignedInteger: {
              break
            }
          }
          break
        }
      }
    }

    return listOfLists
  }

  function consumeTerm(token: LexerTokenType<Lexer>): void {
    const parent = stack[stack.length - 1]
    if (!parent) {
      return
    }

    const term = createSimpleTerm(token.text, token)

    switch (parent.like) {
      case Tree.Term: {
      }
      case Tree.Plugin: {
        const handle: TreeHandleType = {
          element: [],
          like: Tree.Handle,
          term,
        }
        parent.element = handle
        handleAfterConsumeTerm(parent, handle, term)
        break
      }
      case Tree.Handle:
      case Tree.Module: {
        const handle: TreeHandleType = {
          element: [],
          like: Tree.Handle,
          term,
        }
        parent.element.push(handle)
        handleAfterConsumeTerm(parent, handle, term)
        break
      }
      default:
        api.throwError(
          api.generateUnhandledTreeResolver({
            ...input,
            scope: parent.like,
            token,
          }),
        )
    }
  }

  function handleAfterConsumeTerm(
    parent: TreeNodeType,
    handle: TreeHandleType,
    term: TreeTermType,
  ): void {
    const next = peek()
    if (!next) {
      return
    }

    switch (next.like) {
      case Lexer.OpenInterpolation: {
        const token = consume()
        consumeOpenInterpolationWithTerm(term, token)
        break
      }

      case Lexer.OpenNesting: {
        workList.push({
          callback: consumeOpenNestingWithTermHandle,
          parent: handle,
        })
        break
      }

      case Lexer.CloseInterpolation: {
        break
      }

      default:
        api.throwError(
          api.generateUnhandledTreeResolver({
            ...input,
            token: next,
          }),
        )
    }
  }

  function consumeOpenNestingWithTermHandle(
    parent: TreeNodeType,
    token: LexerTokenType<Lexer>,
  ): void {
    api.assertTreeType(parent, Tree.Handle)

    const next = peek()
    if (!next) {
      return
    }

    switch (next.like) {
      case Lexer.TermPath: {
        workList.push({
          callback: consumeTermPath,
          parent,
        })
        break
      }
      default:
        api.throwError(
          api.generateUnhandledTreeResolver({
            ...input,
            token,
          }),
        )
    }
  }

  function consumeOpenInterpolationWithTerm(
    parent: TreeNodeType,
    token: LexerTokenType<Lexer>,
  ): void {
    api.assertTreeType(parent, Tree.Term)
    api.assertLexerType(token, Lexer.OpenInterpolation)

    const plugin: TreePluginType = {
      like: Tree.Plugin,
      size: token.text.length,
    }

    parent.segment.push(plugin)

    const next = peek()
    if (!next) {
      return
    }

    switch (next.like) {
      case Lexer.TermPath: {
        consumeTermPath(plugin, consume())
        break
      }
      case Lexer.CloseInterpolation: {
        throw new Error('Open then close')
      }
      default:
        api.throwError(
          api.generateUnhandledTreeResolver({
            ...input,
            scope: next.like,
            token,
          }),
        )
    }
  }

  function consumePath(token: LexerTokenType<Lexer>): void {
    const parent = stack[stack.length - 1]
    if (!parent) {
      return
    }

    switch (parent.like) {
      case Tree.Term: {
        const parts = token.text.split(/\//)
        const firstFragment = parts.shift()
        api.assertString(firstFragment)
        const string = createString(firstFragment, {
          end: {
            character:
              token.start.character + firstFragment.length,
            line: token.start.line,
          },
          like: Lexer.String,
          offset: {
            end: token.offset.start + firstFragment.length,
            start: token.offset.start,
          },
          start: {
            character: token.start.character,
            line: token.start.line,
          },
          text: firstFragment,
        })
        const segment: Array<TreeTermType> = []

        for (const step of parts) {
          // TODO: update the positions
          segment.push(createSimpleTerm(step, token))
        }

        const parentParent = stack[stack.length - 2]
        if (!parentParent) {
          return
        }

        if (parentParent)
      }
      case Tree.Handle: {
        const parts = token.text.split(/\//)
        const segment: Array<TreeTermType> = []

        for (const step of parts) {
          segment.push(createSimpleTerm(step, token))
        }

        const path: TreePathType = {
          like: Tree.Path,
          segment,
        }
        parent.element.push(path)
        break
      }
      default: {
        api.throwError(
          api.generateUnhandledTreeResolver({
            ...input,
            scope: parent.like,
            token,
          }),
        )
      }
    }
  }

  function createSimpleTerm(
    text: string,
    token: LexerTokenType<Lexer>,
  ): TreeTermType {
    const dive = Boolean(text.match(/\*/))
    const guard = Boolean(text.match(/\?/))
    const key = Boolean(text.match(/~/))
    const name = text.replace(/[\*\~\?]/g, '')
    return {
      dive,
      guard,
      key,
      like: Tree.Term,
      segment: [createString(name, token)],
    }
  }

  function createString(
    value: string,
    token: LexerTokenType<Lexer>,
  ): TreeStringType {
    return {
      value,
      ...api.omit(token, ['text']),
      like: Tree.String,
    }
  }

  function peek(amount = 1) {
    return input.tokenList[i + amount]
  }

  function consume(amount = 1) {
    i += amount
    const t = input.tokenList[i]
    api.assertLexerGenericType(t)
    return t
  }

  console.log(api.prettifyJSON(result))

  return {
    ...input,
    parseTree: result,
  }
}

export function generateUnhandledTreeResolver(
  input: TreeInputType & { scope?: string },
): ErrorType {
  const token = input.token

  const range: CursorRangeType = {
    end: {
      character: token.end.character,
      line: token.end.line,
    },
    start: {
      character: token.start.character,
      line: token.start.line,
    },
  }

  const text = api.generateHighlightedError(
    input.textInLines,
    range,
  )

  return {
    code: `0022`,
    file: input.path,
    note: `We haven't implemented a handler for the \`${
      token.like
    }\` item${
      input.scope ? ` in the \`${input.scope}\` scope` : ''
    } yet.`,
    text,
  }
}

export function isLexerGenericType(
  object: unknown,
): object is LexerTokenType<Lexer> {
  return (
    api.isRecord(object) &&
    'like' in object &&
    LEXER_TYPE.includes((object as LexerTokenType<Lexer>).like)
  )
}

export function isLexerType<T extends Lexer>(
  object: unknown,
  like: T,
): object is LexerTokenType<T> {
  return (
    api.isRecord(object) &&
    'like' in object &&
    (object as LexerTokenType<Lexer>).like === like
  )
}
