import chalk from 'chalk'

import {
  ERROR,
  MESH_HINT_TEXT,
  MeshHint,
  SOURCE_MAPS,
  Tree,
  code,
  prettifyJSON,
} from '~'
import type {
  MeshInputType,
  Text,
  TextSplitInputType,
  TextTokenType,
} from '~'

export class BaseLinkError extends Error {}

export type CursorLinePositionType = {
  character: number
  line: number
}

export type CursorRangeType = {
  end: CursorLinePositionType
  start: CursorLinePositionType
}

export type SiteErrorConfigType = {
  code: string
  hint?: string
  note: (props: Record<string, unknown>) => string
  text?: string
}

export type SiteErrorInputType = Record<string, unknown>

const consumers = {}

export type SiteErrorType = {
  code: string
  file?: string
  hint?: string
  note: string
  text?: string
}

export function assertError(
  error: unknown,
): asserts error is SiteErrorConfigType {
  if (!code.isError(error)) {
    throw new Error('Error handler undefined')
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

export function generateHighlightedErrorForTerm(
  input: MeshInputType,
): string {
  const highlightedRange = code.getCursorRangeForTerm(input)
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

export function generateMissingStringError(
  input: MeshInputType,
  property: string,
): SiteErrorType {
  const nest = code.assumeNest(input)
  const term = nest.line[0]
  code.assertTreeType(term, Tree.Term)
  const childInput = code.extendWithObjectScope(input, term)
  const name = code.resolveStaticTerm(childInput)
  const text = code.generateHighlightedErrorForTerm(input)
  return {
    code: `0011`,
    file: `${input.card.path}`,
    note: `String property \`${property} <...>\` missing in \`${name}\`.`,
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
    highlight.start.line = lastToken.start.line
    highlight.end.line = lastToken.end.line
    highlight.end.character = lastToken.end.character
  }

  const text = code.generateHighlightedError(
    input.textInLines,
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
  const text = code.generateHighlightedErrorForTerm(input)
  return {
    code: `0005`,
    file: `${card.path}`,
    note: `We haven't implemented handling this type of nest yet.`,
    text,
  }
}

export function generateUnhandledNestCaseError(
  input: MeshInputType,
  type: MeshHint,
): SiteErrorType {
  let scope
  try {
    scope = code.resolveStaticTermFromNest(input, 1)
  } catch (e) {}
  const text = code.generateHighlightedErrorForTerm(input)
  return {
    code: `0004`,
    file: `${input.card.path}`,
    note: `We haven't implemented handling "${
      MESH_HINT_TEXT[type]
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
  const text = code.generateHighlightedErrorForTerm(input)
  return {
    code: `0002`,
    file: `${input.card.path}`,
    note: handle.note({ name, scope }),
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
  const text = code.generateHighlightedErrorForTerm(input)
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

export function getCursorRangeForTerm(
  input: MeshInputType,
): CursorRangeType {
  const nest = code.assumeNest(input)

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

  let line = nest.line[0]
  if (!line) {
    return range
  }

  if (line.like !== Tree.Term) {
    return range
  }

  const first = line.link[0]
  if (!first) {
    return range
  }

  if (first.like === Tree.Cord) {
    range.start.line = first.lineNumber
    range.start.character = first.lineCharacterNumberStart
    range.end.line = first.lineNumber
    range.end.character = first.lineCharacterNumberEnd
  }

  const lastTop = nest.line[nest.line.length - 1]

  if (lastTop && lastTop.like === Tree.Term) {
    const last = lastTop.link[line.link.length - 1]

    if (last && last !== first) {
      if (last.like === Tree.Cord) {
        range.end.line = last.lineNumber
        range.end.character = last.lineCharacterNumberEnd
      } else if (last.like === Tree.Slot) {
        const lastNest = last.nest
        const lastLine = lastNest.line[lastNest.line.length - 1]
        if (lastLine && lastLine.like === Tree.Term) {
          const childRange = code.getCursorRangeForTerm(
            code.extendWithNestScope(input, {
              nest: lastNest,
            }),
          )
          range.end.line = childRange.end.line
          range.end.character =
            childRange.end.character + last.size
        } else {
          throw new Error('Unhandled')
        }
      } else if (last.like === Tree.Term) {
        const childRange = code.getCursorRangeForTerm(
          code.extendWithNestScope(input, {
            nest: last,
          }),
        )
        range.end.line = childRange.end.line
        range.end.character = childRange.end.character
      }
    }
  } else {
    console.log(lastTop)
    throw new Error('Unhandled')
  }

  return range
}

export function getCursorRangeForText(
  input: MeshInputType,
): CursorRangeType {
  const nest = code.assumeNest(input)

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

  if (nest.line.length > 1) {
    return range
  }

  let line = nest.line[0]
  if (!line) {
    return range
  }

  if (line.like !== Tree.Text) {
    return range
  }

  const first = line.link[0]
  if (!first) {
    return range
  }

  if (first.like === Tree.Cord) {
    range.start.line = first.lineNumber
    range.start.character = first.lineCharacterNumberStart
    range.end.line = first.lineNumber
    range.end.character = first.lineCharacterNumberEnd
  }

  const last = line.link[line.link.length - 1]

  if (last && last !== first && last.like === Tree.Cord) {
    range.end.line = last.lineNumber
    range.end.character = last.lineCharacterNumberEnd
  }

  return range
}

export function highlightTextRangeForError(
  bound: CursorRangeType,
  textByLine: Array<string>,
  highlight: CursorRangeType,
): string {
  const lines: Array<string> = []
  let i = bound.start.line
  let n = bound.end.line
  let pad = String(n).length
  const defaultIndent = new Array(pad + 1).join(' ')
  lines.push(chalk.white(`${defaultIndent} |`))
  while (i <= n) {
    const lineText = textByLine[i]
    const x = i + 1
    let z =
      i < textByLine.length - 1
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

export function throwError(data: SiteErrorType): void {
  const text: Array<string> = []

  text.push(``)
  text.push(
    chalk.gray(`  note <`) +
      chalk.whiteBright(`${data.note}`) +
      chalk.gray('>'),
  )
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
            const map = SOURCE_MAPS[x]

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

  const error = new BaseLinkError(text.join('\n'))
  error.name = ''

  Error.captureStackTrace(error)

  error.stack

  Error.prepareStackTrace = prepareStackTrace

  throw error
}
