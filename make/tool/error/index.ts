import chalk from 'chalk'
import { diffChars } from 'diff'

import {
  ERROR,
  FoldStateInputType,
  LINK_HINT_TEXT,
  Link,
  LinkHint,
  MeshInputType,
  SOURCE_MAP_MESH,
  Text,
  TextSplitInputType,
  TextTokenType,
  code,
  prettifyJSON,
} from '~'

export * from './content.js'

export class BaseLinkError extends Error {
  data: SiteErrorType

  constructor(message: string, data: SiteErrorType) {
    super(message)

    this.data = data
  }
}

export class CompilerError extends Error {}

export type CursorLinePositionType = {
  character: number
  line: number
}

export type CursorRangeType = {
  end: CursorLinePositionType
  start: CursorLinePositionType
}

export enum ErrorTerm {
  CompilationError = 'compilation-error',
  CompilerError = 'compiler-error',
  SyntaxError = 'syntax-error',
  SystemError = 'system-error',
}

export type SiteErrorConfigType = {
  code: string
  hint?: string
  note: (props: Record<string, unknown>) => string
  text?: string
}

const consumers = {}

export type SiteErrorInputType = Record<string, unknown>

export type SiteErrorType = {
  code: string
  file?: string
  hint?: string
  note: string
  term?: Array<string>
  text?: string
}

export class TypescriptError extends Error {}

export function assertError(
  error: unknown,
): asserts error is SiteErrorConfigType {
  if (!code.isError(error)) {
    throw new Error('Error handler undefined')
  }
}

export function createDefaultRange(): CursorRangeType {
  return {
    end: {
      character: 0,
      line: 0,
    },
    start: {
      character: 0,
      line: 0,
    },
  }
}

export function generateCompilerTodoError(
  hint?: string,
): SiteErrorType {
  return {
    code: `0029`,
    hint: [
      `This part of the compiler is unfinished, see the stack trace for where to modify code.`,
      hint,
    ]
      .filter(x => x)
      .join(' '),
    note: `Compiler TODO`,
    term: [ErrorTerm.CompilerError],
  }
}

export function generateForkMissingPropertyError(
  property: string,
): SiteErrorType {
  return {
    code: `0010`,
    note: `Scope is missing property '${property}'.`,
  }
}

export function generateHighlightedError(
  textByLine: Array<string>,
  highlight: CursorRangeType,
): string {
  const endLine = Math.min(
    highlight.start.line + 2,
    textByLine.length - 1,
  )
  const endLineString = textByLine[endLine]
  code.assertString(endLineString)
  const endCharacter = endLineString.length - 1
  const boundedRange: CursorRangeType = {
    end: {
      character: endCharacter,
      line: endLine,
    },
    start: {
      character: 0,
      line: Math.max(0, highlight.start.line - 2),
    },
  }

  const text = highlightTextRangeForError(
    boundedRange,
    textByLine,
    highlight,
  )

  return text
}

export function generateHighlightedErrorForLinkTree(
  input: MeshInputType,
): string {
  const highlightedRange = code.getCursorRangeForTree(input)
  return code.generateHighlightedError(
    input.card.textByLine,
    highlightedRange,
  )
}

export function generateHighlightedErrorForText(
  input: MeshInputType,
): string {
  const highlightedRange = code.getCursorRangeForText(input)
  return code.generateHighlightedError(
    input.card.textByLine,
    highlightedRange,
  )
}

export function generateIncorrectlyTypedVariable(
  like: string | Array<string>,
  name?: string,
): SiteErrorType {
  like = Array.isArray(like) ? like : [like]
  const words =
    like.length > 1
      ? like
          .slice(-1)
          .map(x => `\`${x}\``)
          .join(', ') + ` or \`${like[like.length - 1]}\``
      : `\`${like[0]}\``
  const text = name ? ` \`${name}\`` : ''
  return {
    code: `0027`,
    note: `Variable${text} is not typed as a ${words}.`,
  }
}

export function generateInvalidCompilerStateError(
  hint?: string,
  path?: string,
): SiteErrorType {
  return {
    code: `0028`,
    file: path,
    hint: [
      hint,
      `This is some bug with the budding compiler. Check the stack trace to see where the error occurred.`,
    ]
      .filter(x => x)
      .join(' '),
    note: `Invalid compiler state`,
  }
}

export function generateInvalidDeckLink(
  input: MeshInputType,
  link: string,
): SiteErrorType {
  return {
    code: `0008`,
    note: `Invalid deck link '${link}'.`,
  }
}

export function generateInvalidNestChildrenLengthError(
  input: MeshInputType,
  length: number,
): SiteErrorType {
  return {
    code: `0009`,
    note: `Term doesn't have ${length} children.`,
  }
}

export function generateInvalidPatternError(
  input: MeshInputType,
  pattern: unknown,
): SiteErrorType {
  const { card } = input
  const nest = code.assumeNest(input)
  const text = code.generateHighlightedErrorForText(input)
  return {
    code: `0012`,
    file: `${card.path}`,
    note: `Text does not match pattern ${pattern}.`,
    text: text,
  }
}

export function generateInvalidWhitespaceError(
  input: FoldStateInputType,
): SiteErrorType {
  const token = input.tokenList[input.state.index]
  code.assertTextGenericType(token)
  const highlightedRange =
    code.getCursorRangeForTextWhitespaceToken(token, input)
  const text = code.generateHighlightedError(
    input.textByLine,
    highlightedRange,
  )

  return {
    code: '0027',
    file: input.path,
    note: `Invalid whitespace`,
    text,
  }
}

export function generateModuleUnresolvableError(
  input: MeshInputType,
): SiteErrorType {
  return {
    code: '0020',
    file: `${input.card.path}`,
    note: `Module has unresolvable references`,
  }
}

export function generateObjectNotTypeError(
  object: unknown,
  like: Array<string>,
): SiteErrorType {
  const words =
    like.length > 1
      ? like
          .slice(-1)
          .map(x => `\`${x}\``)
          .join(', ') + ` or \`${like[-1]}\``
      : `\`${like[0]}\``
  return {
    code: `0007`,
    note: `Object isn't type ${words}.`,
    text:
      object == null ? String(object) : prettifyJSON(object),
  }
}

export function generateScopeMissingPropertyError(
  property: string,
): SiteErrorType {
  return {
    code: '0019',
    note: `Scope is missing property ${property}.`,
  }
}

export function generateStringMismatchError(
  input: TextSplitInputType,
  a: string,
  b: string,
): SiteErrorType {
  return {
    code: '0030',
    file: input.path,
    note: 'String mismatch error',
    text: code.renderDiffText(a, b),
  }
}

export function generateSyntaxTokenError(
  input: TextSplitInputType,
  lastToken?: TextTokenType<Text>,
): SiteErrorType {
  const highlight: CursorRangeType = {
    end: {
      character: 0,
      line: 0,
    },
    start: {
      character: 0,
      line: 0,
    },
  }

  if (lastToken) {
    highlight.start.line = lastToken.range.line.start
    highlight.end.line = lastToken.range.line.end
    highlight.start.character = lastToken.range.character.start
    highlight.end.character = lastToken.range.character.end
  }

  const text = code.generateHighlightedError(
    input.textByLine,
    highlight,
  )

  return {
    code: `0021`,
    note: `Error in the structure of the text tree.`,
    text,
  }
}

export function generateTermMissingChildError(): void {}

export function generateTermMissingError(
  input: MeshInputType,
  type: string,
  object: string,
): SiteErrorType {
  const { card } = input
  return {
    code: `0018`,
    file: `${card.path}`,
    note: `Term ${type} is missing on ${object}.`,
    text: '',
  }
}

export function generateUnhandledNestCaseBaseError(
  input: MeshInputType,
): SiteErrorType {
  const { card } = input
  const text = code.generateHighlightedErrorForLinkTree(input)
  return {
    code: `0005`,
    file: `${card.path}`,
    note: `We haven't implemented handling this type of nest yet.`,
    text,
  }
}

export function generateUnhandledNestCaseError(
  input: MeshInputType,
  type: LinkHint,
): SiteErrorType {
  let scope
  try {
    scope = code.resolveStaticTermFromNest(input, 1)
  } catch (e) {}
  const text = code.generateHighlightedErrorForLinkTree(input)
  return {
    code: `0004`,
    file: `${input.card.path}`,
    note: `We haven't implemented handling "${
      LINK_HINT_TEXT[type]
    }s" yet${scope ? ` on \`${scope}\`` : ''}.`,
    text,
  }
}

export function generateUnhandledTermCaseError(
  input: MeshInputType,
): SiteErrorType {
  let scope
  try {
    scope = code.resolveStaticTermFromNest(input, 1)
  } catch (e) {}
  const name = code.resolveStaticTermFromNest(input)
  code.assertString(name)
  const handle = ERROR['0002']
  code.assertError(handle)
  const text = code.generateHighlightedErrorForLinkTree(input)
  return {
    code: `0002`,
    file: `${input.card.path}`,
    note: handle.note({ name, scope }),
    term: [ErrorTerm.CompilerError],
    text,
  }
}

export function generateUnhandledTermInterpolationError(
  input: MeshInputType,
): SiteErrorType {
  return {
    code: `0001`,
    file: `${input.card.path}`,
    note: `We haven't implemented handling term interpolation yet.`,
    text: '',
  }
}

export function generateUnknownTermError(
  input: MeshInputType,
): SiteErrorType {
  const { card } = input
  const name = code.resolveStaticTermFromNest(input)
  const text = code.generateHighlightedErrorForLinkTree(input)
  const insideName = code.resolveStaticTermFromNest(input, 1)
  return {
    code: `0003`,
    file: `${card.path}`,
    note: `Unknown term \`${name}\`${
      insideName ? ` inside \`${insideName}\`` : ''
    }.`,
    text: text,
  }
}

export function generateUnresolvedPathError(
  input: MeshInputType,
  path: string,
): SiteErrorType {
  const { card } = input
  return {
    code: `0013`,
    file: card.path,
    note: `File not found ${path}.`,
  }
}

export function generatedNotImplementedYetError(
  name?: string,
  path?: string,
): SiteErrorType {
  return {
    code: '0024',
    file: path,
    note: `We have not yet implemented ${
      name ? `${name}` : 'something you referenced'
    }.`,
    term: [ErrorTerm.CompilerError],
  }
}

export function getCursorRangeForPath(
  input: MeshInputType,
): CursorRangeType {
  const path = code.assumeLinkType(input, Link.Path)
  const start = getCursorRangeForTerm(
    code.extendWithNestScope(input, { nest: path.segment[0] }),
  )
  const end = getCursorRangeForTerm(
    code.extendWithNestScope(input, {
      nest: path.segment[path.segment.length - 1],
    }),
  )
  const range: CursorRangeType = {
    end: {
      character: end.end.character,
      line: end.end.line,
    },
    start: {
      character: start.start.character,
      line: start.start.line,
    },
  }
  return range
}

export function getCursorRangeForPlugin(
  input: MeshInputType,
): CursorRangeType {
  const nest = code.assumeLinkType(input, Link.Plugin)
  const child = nest.nest[0]

  switch (child?.like) {
    case Link.Term: {
      return code.getCursorRangeForTerm(
        code.extendWithNestScope(input, { nest }),
      )
    }
    case Link.Path: {
      return code.getCursorRangeForPath(
        code.extendWithNestScope(input, { nest }),
      )
    }
    case Link.Tree: {
      return code.getCursorRangeForTree(
        code.extendWithNestScope(input, { nest }),
      )
    }
    default:
      code.throwError(code.generateInvalidCompilerStateError())
  }
}

export function getCursorRangeForString(
  input: MeshInputType,
): CursorRangeType {
  const string = code.assumeLinkType(input, Link.String)

  return {
    end: {
      character: string.range.character.end,
      line: string.range.line.end,
    },
    start: {
      character: string.range.character.start,
      line: string.range.line.start,
    },
  }
}

export function getCursorRangeForTerm(
  input: MeshInputType,
): CursorRangeType {
  const term = code.assumeLinkType(input, Link.Term)
  const range: CursorRangeType = createDefaultRange()

  const start = term.segment[0]
  const end = term.segment[term.segment.length - 1]

  if (!start || start.like !== Link.String) {
    return range
  }

  if (!end || end.like !== Link.String) {
    return range
  }

  range.end.character = end.range.character.end
  range.end.line = end.range.line.end

  range.start.character = start.range.character.start
  range.start.line = start.range.line.start

  return range
}

export function getCursorRangeForText(
  input: MeshInputType,
): CursorRangeType {
  const nest = code.assumeLinkType(input, Link.Text)

  const range: CursorRangeType = {
    end: {
      character: 0,
      line: 0,
    },
    start: {
      character: 0,
      line: 0,
    },
  }

  const first = nest.segment[0]
  const last = nest.segment[nest.segment.length - 1]

  code.assertGenericLinkType(first)
  code.assertGenericLinkType(last)

  let firstRange: CursorRangeType

  if (first.like === Link.String) {
    firstRange = code.getCursorRangeForString(
      code.extendWithNestScope(input, { nest: first }),
    )
  } else if (first.like === Link.Plugin) {
    firstRange = code.getCursorRangeForPlugin(
      code.extendWithNestScope(input, { nest: first }),
    )
  } else {
    code.throwError(code.generateInvalidCompilerStateError())
    throw new CompilerError()
  }

  if (firstRange) {
    range.start.line = firstRange.start.line
    range.start.character = firstRange.start.character
    range.end.line = firstRange.end.line
    range.end.character = firstRange.end.character
  }

  let lastRange: CursorRangeType

  if (last.like === Link.String) {
    lastRange = code.getCursorRangeForString(
      code.extendWithNestScope(input, { nest: last }),
    )
  } else if (last.like === Link.Plugin) {
    lastRange = code.getCursorRangeForPlugin(
      code.extendWithNestScope(input, { nest: last }),
    )
  } else {
    code.throwError(code.generateInvalidCompilerStateError())
    throw new CompilerError()
  }

  if (lastRange) {
    range.end.line = lastRange.end.line
    range.end.character = lastRange.end.character
  }

  return range
}

export function getCursorRangeForTextWhitespaceToken(
  token: TextTokenType<Text>,
  input: FoldStateInputType,
): CursorRangeType {
  let tokens: Array<TextTokenType<Text>> = []
  let i = input.state.index

  loop: while (i < input.tokenList.length) {
    let t = input.tokenList[i]
    code.assertTextGenericType(t)
    switch (t.like) {
      case Text.OpenIndentation:
      case Text.OpenNesting:
        tokens.push(t)
        break
      default:
        break loop
    }
    i++
  }

  const start = tokens[0]
  const end = tokens[tokens.length - 1]

  code.assertTextGenericType(start)
  code.assertTextGenericType(end)

  return {
    end: {
      character: end.range.character.end,
      line: end.range.line.end,
    },
    start: {
      character: start.range.character.start,
      line: start.range.line.start,
    },
  }
}

export function getCursorRangeForTree(
  input: MeshInputType,
): CursorRangeType {
  const nest = code.assumeNest(input)

  switch (nest.like) {
    case Link.Tree: {
      const term = nest.head
      if (!term) {
        code.throwError(
          code.generateInvalidCompilerStateError(),
        )
        throw new CompilerError()
      }

      return getCursorRangeForTerm(
        code.extendWithNestScope(input, { nest: term }),
      )
    }
    case Link.Path: {
      return getCursorRangeForPath(input)
    }
    case Link.Term: {
      return getCursorRangeForTerm(input)
    }
    default:
      code.throwError(code.generateInvalidCompilerStateError())
      throw new CompilerError()
  }
}

export function highlightTextRangeForError(
  bound: CursorRangeType,
  textByLine: Array<string>,
  highlight: CursorRangeType,
): string {
  const lines: Array<string> = []
  let i = bound.start.line
  let n = bound.end.line
  let pad = String(n + 1).length
  const defaultIndent = new Array(pad + 1).join(' ')
  lines.push(chalk.white(`${defaultIndent} |`))
  while (i <= n) {
    const lineText = textByLine[i]
    const x = i + 1
    let z =
      i < textByLine.length
        ? x.toString().padStart(pad, ' ')
        : defaultIndent
    if (highlight.start.line === i) {
      lines.push(chalk.whiteBright(`${z} | ${lineText}`))
      const indentA = new Array(z.length + 1).join(' ')
      const indentB = new Array(
        highlight.start.character + 1,
      ).join(' ')
      const squiggly = new Array(
        highlight.end.character - highlight.start.character + 1,
      ).join('~')
      lines.push(
        chalk.white(`${indentA} | ${indentB}`) +
          chalk.red(`${squiggly}`),
      )
    } else {
      lines.push(chalk.white(`${z} | ${lineText}`))
    }
    i++
  }

  lines.push(chalk.white(`${defaultIndent} |`))

  return lines.join('\n')
}

export function isError(
  error: unknown,
): error is SiteErrorConfigType {
  return (
    code.isRecord(error) &&
    Boolean((error as SiteErrorConfigType).code)
  )
}

export function renderDiffText(a: string, b: string): string {
  const text: Array<string> = []
  const diff = diffChars(a, b)

  diff.forEach(part => {
    const value = part.value.replace(/ /g, '◌')
    if (part.added) {
      text.push(chalk.green(value))
    } else if (part.removed) {
      text.push(chalk.red(value))
    } else {
      text.push(chalk.gray(value))
    }
  })

  return text.join('')
}

export function throwError(data: SiteErrorType): void {
  const text: Array<string> = []

  text.push(``)
  text.push(
    chalk.gray(`  note <`) +
      chalk.whiteBright(`${data.note}`) +
      chalk.gray('>'),
  )

  if (data.hint) {
    text.push(
      chalk.gray(`  hint <`) +
        chalk.whiteBright(`${data.hint}`) +
        chalk.gray('>'),
    )
  }

  data.term?.forEach(term => {
    text.push(chalk.gray(`    term `) + chalk.white(`${term}`))
  })

  text.push(
    chalk.gray(`    code `) + chalk.white(`#${data.code}`),
  )

  if (data.file) {
    if (data.text) {
      text.push(
        chalk.gray(`    file <`) +
          chalk.whiteBright(`${data.file}`) +
          chalk.gray(`>, <`),
      )
      data.text.split('\n').forEach(line => {
        text.push(`      ${line}`)
      })
      text.push(chalk.gray(`    >`))
    } else {
      text.push(
        chalk.gray(`    file <`) +
          chalk.whiteBright(`${data.file}`) +
          chalk.gray(`>`),
      )
    }
  } else if (data.text) {
    text.push(chalk.gray(`    text <`))
    data.text.split('\n').forEach(line => {
      text.push(`      ${line}`)
    })
    text.push(chalk.gray('    >'))
  }
  text.push(``)

  // Error.stackTraceLimit = Infinity

  const prepareStackTrace = Error.prepareStackTrace

  Error.prepareStackTrace = function prepareStackTrace(
    error: Error,
    stack: Array<NodeJS.CallSite>,
  ): string {
    return (
      error.message +
      chalk.gray('    list base\n') +
      stack
        .slice(1)
        .map((site: NodeJS.CallSite) => {
          let x = site.getFileName()
          let a = site.getLineNumber()
          let b = site.getColumnNumber()

          if (
            x &&
            code.isNumber(a) &&
            code.isNumber(b) &&
            code.isString(x)
          ) {
            // x = code.resolveNativePath(x.replace(/^file:\/\//, ''))
            const map = SOURCE_MAP_MESH[x]

            const trace = {
              column: b,
              filename: x,
              line: a,
            }

            if (map) {
              const token = map.originalPositionFor(trace)
              if (token.source) {
                x =
                  token.source &&
                  code.resolveNativePath(
                    token.source,
                    code.resolveDirectoryPath(
                      x.replace(/^file:\/\//, ''),
                    ),
                  )
                a = token.line
                b = token.column
              }
            }
          }
          let m = site.getMethodName()?.trim()
          let f = site.getFunctionName()?.trim()
          let t = site.getTypeName()?.trim()
          let label = m
            ? [t, m].join('.')
            : t
            ? [t, f].join('.')
            : f || '[anonymous]'
          label = label ? label : ''
          let line =
            chalk.gray('      call <') +
            chalk.white(label) +
            chalk.gray('>')

          if (x && a && b) {
            line +=
              chalk.gray('\n        site <') +
              chalk.whiteBright([x, a, b].join(':')) +
              chalk.gray('>')
          }
          return line
        })
        .join('\n') +
      '\n'
    )
  }

  const error = new BaseLinkError(text.join('\n'), data)
  error.name = ''

  Error.captureStackTrace(error)

  error.stack

  Error.prepareStackTrace = prepareStackTrace

  throw error
}
