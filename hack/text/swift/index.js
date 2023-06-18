
const mkdirp = require('mkdirp')
const changeCase = require('change-case')
const fs = require('fs')
const peg = require('pegjs')
const grammar = fs.readFileSync('grammar.pegjs', 'utf-8')
const parser = peg.generate(grammar, { trace: false })
const glob = require('glob')

const types = glob.sync('documentation/**/*.json')

const NAMING = {}

types.map(t => {
  let data = JSON.parse(fs.readFileSync(t, 'utf-8'))
  const short = data.name.split('.').pop()
  const path = data.path.replace(/^\/documentation\//, '')

  NAMING[data.name] = { short, path }
  data.path = path

  return data
}).forEach(data => {
  if (!data.type.match(/^(Class|Protocol|Structure|Enumeration|Instance Property)$/i)) return

  const imports = {}

  let text = []

  switch (data.type) {
    case 'Class':
    case 'Structure':
      parseClass()
      break
    case 'Protocol':
      parseProtocol()
      break
    case 'Enumeration':
      break
    case 'Instance Property':
      break
    default:
      throw new Error(data.type)
  }

  function parseProtocol() {
    parseClass(`suit`)
  }

  function parseClass(type = 'form') {
    text.push(``)

    const variables = []
    const classVars = []
    const classFxns = []
    const fxns = []
    const ctors = []

    data.items.forEach(item => {
      if (item.name.match(/^(protocol|struct|typealias|enum|property list)/i)) return
      if (item.name.match(/^class [A-Z]/)) return
      if (item.name.match(/inout|\$|-|\+/)) return
      // console.log(item.name)
      try {
        const code = parser.parse(item.name)
        if (code.kind === 'variable') {
          if (code.isClass) {
            classVars.push(code)
          } else {
            variables.push(code)
          }
        } else if (code.kind === 'constructor') {
          ctors.push(code)
        } else {
          if (code.isClass) {
            classFxns.push(code)
          } else {
            fxns.push(code)
          }
        }
      } catch (e) {
        console.log(e)
      }
    })

    if (ctors.length || variables.length || fxns.length || classFxns.length) {
      text.push(`${type} ${toSlug(getName(data.name))}, name <${data.name}>`)
      if (data.desc) {
        text.push(`  note <${clean(data.desc)}>`)
      }
      text.push('')

      variables.forEach(v => {
        const vtext = [`  link ${toSlug(getName(v.name))}`]

        if (v.type) {
          console.log(data.name, v.name)
          let type
          if (v.type?.type) {
            type = toSlug(getName(v.type.type.map(x => x.name).join('.'), imports, data.name))
          } else {
            console.log(v.type)
            console.log(v.type.type)
          }

          if (`${vtext[0]} like ${type}`.length > 96) {
            vtext.push(`    like ${type}`)
          } else {
            vtext[0] += `, like ${type}`
          }
        }
        if (v.isMut) {
          vtext.push(`    flex true`)
        }

        text.push(...vtext)
      })

      fxns.forEach(f => {
        const vtext = [`  task ${toSlug(getName(f.name))}`]

        if (f.ret) {

        }

        f.params?.forEach((p, i) => {
          vtext.push(`    take ${toSlug(p.name ?? (i + 1).toString())}`)
        })

        if (f.isAsync) {
          vtext.push(`    wait true`)
        }
        if (f.throws) {
          vtext.push(`    kink true`)
        }

        text.push(...vtext)
      })

      ctors.forEach(c => {
        // console.log(JSON.stringify(c, null, 2))
        text.push(`  hook make`)
        const head = []
        if (c.isAsync) {
          head.push(`    wait true`)
        }
        if (c.unwrapped) {
          head.push(`    sift true`)
        }
        if (c.optional) {
          head.push(`    void true`)
        }

        if (head.length) text.push(``)

        text.push(...head)

        if (c.heads.length) {
          c.heads.forEach(h => {
            const type = toSlug(getName(h.type.map(x => x.name).join('.'), imports, data.name))
            text.push(`    head ${type}`)
          })
        }
        let p = 0

        if (c.heads.length) {
          text.push(``)
        }

        c.params?.forEach(h => {
          text.push(`    take ${toSlug(h.name ?? `t-${++p}`)}, name <${h.name}>`)
          if (h.type) {
            if (h.type.type) {
              const type = toSlug(getName(h.type.type.map(x => x.name).join('.'), imports, data.name))
              let indent = ''
              if (h.type.isArray) {
                indent = '  '
                text.push(`      like list`)
                text.push(`        like ${type}`)
              }
              if (h.type.rest) {
                text.push(`      ${indent}rest take`)
              }
              if (h.type.unwrapped) {
                text.push(`      ${indent}sift take`)
              }
              if (h.type.optional) {
                text.push(`      ${indent}void take`)
              }
            } else if (h.type.isIntersection) {
              const a = toSlug(getName(h.type.a.map(x => x.name).join('.'), imports, data.name))
              const b = toSlug(getName(h.type.b.type.map(x => x.name).join('.'), imports, data.name))
              text.push(`      like link`)
              text.push(`        like ${a}`)
              text.push(`        like ${b}`)
            } else if (Object.keys(h.type).length) {
              console.log(h.type)
              throw new Error
            }
          }
        })

        text.push('')
      })
    }

    if (classVars.length || classFxns.length) {
      text.push(`bank ${toSlug(data.name)}`)

      classVars.forEach(v => {
        // console.log(JSON.stringify(v, null, 2))
      })

      text.push(``)
    }
  }

  const importText = Object.keys(imports)
    .map(path => {
      return `load @tunebond/bolt/code/swift/${path}\n  take ${toSlug(imports[path])}`
    })

  text.unshift(...importText)
  text.push(``)

  if (text.join('').trim()) {
    mkdirp.sync(`apple2/${data.path}`)
    fs.writeFileSync(`apple2/${data.path}/base.link`, text.join('\n'))
  }
})

function toSlug(x) {
  return changeCase.paramCase(x)
}

function clean(x) {
  return x.replace(/\s+/g, ' ').replace(/’/g, "'")
    .replace(/</g, '\\<')
    .replace(/>/g, '\\>')
}

function getType(type) {
  switch (type) {
    case 'bool': return 'boolean'
    default:
      return type
  }
}

function getPath(name) {
  const mapping = NAMING[name]
  if (mapping) {
    return mapping.path
  } else {
    return 'native'
  }
}

function getName(name, imports, givenName) {
  const mapping = NAMING[name]
  let short = name
  if (mapping) {
    short = mapping.short
  } else {
    console.log(short)
  }

  if (imports && name !== givenName) {
    imports[getPath(name)] = short
  }

  return short
}
