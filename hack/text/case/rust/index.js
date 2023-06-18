
var matchHtmlRegExp = /["'&<>]/;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHTML(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}

const fs = require('fs')
const { paramCase } = require('change-case')
const mkdirp = require('mkdirp')
const peg = require('pegjs')
const grammar = fs.readFileSync('fngrammar.pegjs', 'utf-8')
const grammarTrait = fs.readFileSync('traitgrammar.pegjs', 'utf-8')
const parser = peg.generate(grammar, { trace: false })
const traitParser = peg.generate(grammarTrait, { trace: false })

const paths = fs.readdirSync('docs/std').map(x => `docs/std/${x}`).filter(x => x.endsWith('.json'))

const TRAITS = []

// return
let i = 0
let t = 0
paths.forEach(path => {
  console.log(path)
  if (path === 'docs/std--task--RawWakerVTable.json') return
  const json = JSON.parse(fs.readFileSync(path, 'utf-8'))
  if (!json.title) return
  const title = json.title.split(/\s+/).pop()
  const slug = title.split(/:+/).map(x => paramCase(x.trim())).join('/')
  const form = slug.split('/').pop()
  mkdirp.sync(`tmp/std/${slug}`)
  const text = [``]
  text.push(`form ${form}, name <${title}>`)
  // if (note) text.push(`  note <${escapeHTML(note.replace(/’/g, "'"))}>`)
  json.sections[0].methods.forEach(method => {
    if (method.code.match(' extern ')) return
    if (method.code.match(' impl ')) return
    const code = method.code.split('ⓘ')[0].trim()
    t++
    try {
      const json = parse(code)
      console.log(method.code)
      log(method.code, json, method.text).forEach(line => {
        if (!line.trim()) {
          text.push('')
        } else {
          text.push(`  ${line}`)
        }
      })
    } catch (e) {
      i++
      console.log(code)
      console.log(i, t)
      console.log(e)
      throw new Error
    }
  })

  json.sections[2].traits.forEach(trait => {
    // return TRAITS.push(trait.title)
    const traitJSON = traitParser.parse(trait.title)

    logTrait(trait.title, traitJSON).forEach(line => {
      if (!line.trim()) {
        text.push('')
      } else {
        text.push(`  ${line}`)
      }
    })

    trait.methods.forEach(method => {
      if (method.code.match(' extern ')) return
      if (method.code.match(' impl ')) return
      const code = method.code.split('ⓘ')[0].trim()
      t++
      try {
        const json = parse(code)
        log(method.code, json, method.text).forEach(line => {
          if (!line.trim()) {
            text.push('')
          } else {
            text.push(`  ${line}`)
          }
        })
      } catch (e) {
        i++
        console.log(code)
        console.log(i, t)
        console.log(e)
        throw ''
      }
    })
  })

  fs.writeFileSync(`tmp/std/${slug}/base.link`, text.join('\n'))
})

// fs.writeFileSync('tmp.traits.rs', TRAITS.join('\n'))

function logTrait(code, json) {
  const text = []
  switch (json.object.type) {
    case 'type': {
      const name = json.object.head.name
      const slug = paramCase(name)
      // prefix: { lifetime: '_', isRef: true },
      text.push(`mask ${slug}, name <${name}>`)
      json.implHeads?.forEach(head => {
        switch (head.type) {
          case 'type':
            if (head.isConst) {
              const name = paramCase(head.head.name)
              text.push(`  fill ${name}, calm take`)
              if (head.base) {
                switch (head.base.type) {
                  case 'type':
                    const base = paramCase(head.base.head.name)
                    text.push(`    base ${base}`)
                    break
                  default: throw new Error('base')
                }
              }
            } else {
              const name = paramCase(head.head.name)
              text.push(`  fill ${name}`)
            }
            break
          case 'lifetime':
            text.push(`  time ${getLifetimeName(head.head)}`)
            break
          default:
            console.log(head)
            throw new Error('impl head')
        }
      })
      // json.object.head.heads?.forEach(head => {
      //   console.log(code, head)
      // })
      break
    }
    case 'index-array':
      // TODO
      text.push(`suit list`)

      getIndexArray(json.object).forEach(line => {
        text.push(`    ${line}`)
      })
      break
    default:
      console.log(json.object, code)
      throw new Error('object')
      break
  }
  return text

  function getIndexArray(head) {
    const text = []
    switch (head.head.type) {
      case 'type': {
        const listName = paramCase(head.head.head.name)
        text.push(`fold ${listName}`)
        gatherLikes(head.head.head.heads).forEach(line => {
          text.push(`  ${line}`)
        })
        break
      }
      case 'tuple': {
        text.push(`like list`)
        text.push(`  like form`)
        getTuple(head.head.head).forEach(line => {
          text.push(`    ${line}`)
        })
        break
      }
    }
    const indexName = paramCase(head.tail)
    text.push(`  name ${indexName}`)
    return text
  }

  function gatherLikes(heads) {
    const text = []
    heads.forEach(head => {
      switch (head.type) {
        case 'lifetime':
          text.push(`time ${getLifetimeName(head.head)}`)
          break
        case 'type':
          getType(head).forEach(line => {
            text.push(line)
          })
          // text.push(`like ${paramCase(head.head.name)}`)
          break
        case 'array':
          text.push(`list ${paramCase(head.head.head.name)}`)
          break
        case 'tuple':
          getTuple(head.head).forEach(line => {
            text.push(line)
          })
          break
        case 'fqn':
          getFqn(head.head).forEach(line => {
            text.push(line)
          })
          break
        case 'index-array':
          getIndexArray(head).forEach(line => {
            text.push(line)
          })
          break
        case 'const':
          getConst(head.head).forEach(line => {
            text.push(line)
          })
          break
        case 'never':
          text.push(`like miss`)
          break
        default:
          console.log(head)
          throw new Error('Likes')
          break
      }
    })
    return text
  }
}

function getHeads(heads) {
  const lifetimes = []
  const types = []
  const consts = []

  heads.forEach(head => {
    switch (head.type) {
      case 'lifetime':
        lifetimes.push(head)
        break
      case 'type':
        types.push(head)
        break
      case 'const':
        consts.push(head)
        break
      default:
        console.log(head)
        throw new Error('Handle heads')
        break
    }
  })

  return { lifetimes, types, consts }
}

function log(code, json, note) {
  const text = []

  // if (code === `fn copied<'a, T>(self) -> Copied<Self> where T: 'a + Copy, Self: Iterator<Item = &'a T>,`)
  //   console.log(JSON.stringify(json, null, 2))

  text.push(`task ${paramCase(json.def.name)}, name <${json.def.name}>`)
  if (note) {
    text.push(`  note <${escapeHTML(note.replace(/’/g, "'").replace(/[“”]/g, '"'))}>`)
    text.push('')
  }

  const headText = []

  const { lifetimes, types, consts } = getHeads(json.def.heads)

  lifetimes.forEach(lt => {
    const name = getLifetimeName(lt.head)
    headText.push(`time ${name}`)
  })

  if (lifetimes.length && (types.length || consts.length)) {
    headText.push('')
  }

  types.forEach(type => {
    headText.push(`head ${paramCase(type.head.name)}`)
  })

  consts.forEach(type => {
    headText.push(`head ${paramCase(type.head.head.name)}`)
    headText.push(`  like ${paramCase(type.base.head.name)}`)
    headText.push(`  calm take`)
  })

  let casts = 0
  // let terms = 0
  const castText = []
  const argsText = []
  const leadText = []

  json.def.where.forEach(lead => {
    switch (lead.base.type) {
      case 'fqn':
        getFqn(lead.base.head, 'bind').forEach(line => {
          leadText.push(line)
        })
        break
      case 'type':
        const name = paramCase(lead.base.head.name)
        leadText.push(`bind ${name}`)
        break
      case 'array':
        gatherList(lead.base.head).forEach(line => {
          leadText.push(`  ${line}`)
        })
        break
      default:
        console.log(lead.base)
        throw new Error('lead.base')
    }

    switch (lead.type.type) {
      case 'type':
        getType(lead.type).forEach(line => {
          leadText.push(`  ${line}`)
        })
        break
      case 'enum-function':
        getEnumFunction(lead.type.head).forEach(line => {
          leadText.push(`  ${line}`)
        })
        break
      case 'enum':
        getEnum(lead.type.head).forEach(line => {
          leadText.push(`  ${line}`)
        })
        break
      case 'lifetime':
        leadText.push(`  time ${paramCase(lead.type.head)}`)
        lead.type.tail?.forEach(tail => {
          switch (tail.type) {
            case 'type':
              getType(tail, 'base').forEach(line => {
                leadText.push(`  ${line}`)
              })
              break
            case 'dynamically-sized':
              leadText.push(`  base dynamically-sized`)
              break
            case 'enum-function':
              getEnumFunction(tail.head, 'base').forEach(line => {
                leadText.push(`  ${line}`)
              })
              break
            default:
              console.log(tail)
              throw new Error('tail')
          }
        })
        break
      case 'dynamically-sized':
        leadText.push(`  like dynamically-sized`)
        break
      default:
        console.log(lead.type)
        throw new Error('lead.type')
    }
  })

  function getEnum(head, base = 'like') {
    const text = []
    const name = paramCase(head.name)
    text.push(`${base} ${name}`)
    let t = 0
    head.tuple.forEach(item => {
      const name = `f-${++t}`
      switch (item.type) {
        case 'type':
          const like = paramCase(item.head.name)
          text.push(`  take ${name}, like ${like}`)
          break
        case 'array':
          text.push(`  take ${name}`)
          gatherList(item.head).forEach(line => {
            text.push(`    ${line}`)
          })
          break
        case 'index-array':
          text.push(`  take ${name}`)
          getIndexArray(item).forEach(line => {
            text.push(`    ${line}`)
          })
          break
        case 'fqn':
          text.push(`  take ${name}`)
          getFqn(item.head).forEach(line => {
            text.push(`    ${line}`)
          })
          break
        default:
          console.log(item)
          throw new Error('getEnum')
      }
    })
    return text
  }

  function getEnumFunction(head, base) {
    const text = []
    const name = paramCase(head.name)
    getEnum(head, base).forEach(line => {
      text.push(line)
    })
    text.push(`  free seed`)
    switch (head.ret.type) {
      case 'type':
        getType(head.ret).forEach(line => {
          text.push(`    ${line}`)
        })
        break
      case 'tuple':
        getTuple(head.ret.head).forEach(line => {
          text.push(`    ${line}`)
        })
        break
      case 'fqn':
        getFqn(head.ret.head).forEach(line => {
          text.push(`    ${line}`)
        })
        break
      default:
        throw new Error('getEnumFunction')
    }
    return text
  }

  function gatherLikes(heads) {
    const text = []
    heads.forEach(head => {
      switch (head.type) {
        case 'lifetime':
          text.push(`time ${getLifetimeName(head.head)}`)
          break
        case 'type':
          getType(head).forEach(line => {
            text.push(line)
          })
          // text.push(`like ${paramCase(head.head.name)}`)
          break
        case 'array':
          text.push(`list ${paramCase(head.head.head.name)}`)
          break
        case 'tuple':
          getTuple(head.head).forEach(line => {
            text.push(line)
          })
          break
        case 'fqn':
          getFqn(head.head).forEach(line => {
            text.push(line)
          })
          break
        case 'index-array':
          getIndexArray(head).forEach(line => {
            text.push(line)
          })
          break
        case 'const':
          getConst(head.head).forEach(line => {
            text.push(line)
          })
          break
        case 'never':
          text.push(`like miss`)
          break
        default:
          console.log(head)
          throw new Error('Likes')
          break
      }
    })
    return text
  }

  function gatherList(head) {
    const text = []

    switch (head.type) {
      case 'fqn':
        text.push(`like list`)
        getFqn(head.head).forEach(line => {
          text.push(`  ${line}`)
        })
        break
      case 'type': {
        const listName = paramCase(head.head.name)
        if (head.head.heads.length) {
          text.push(`like list`)
          text.push(`  like ${listName}`)
          gatherLikes(head.head.heads).forEach(line => {
            text.push(`    ${line}`)
          })
        } else {
          text.push(`list ${listName}`)
        }
        break
      }
      case 'index-array':
        text.push(`like list`)

        getIndexArray(head).forEach(line => {
          text.push(`  ${line}`)
        })
        break
      default:
        throw new Error('gatherList')
    }
    return text
  }

  function getType(head, bear = 'like') {
    const text = []
    const like = paramCase(head.head.name)

    if (head.head.heads.length) {
      text.push(`${bear} ${like}`)
      gatherLikes(head.head.heads).forEach(line => {
        text.push(`  ${line}`)
      })
    } else {
      text.push(`${bear} ${like}`)
    }

    if (head.prefix?.lifetime) {
      text.push(`  time ${paramCase(head.prefix.lifetime)}`)
    }
    if (head.prefix?.isRef) {
      text.push(`  cite true`)
    }

    if (head.default) {
      text.push(`  fall back`)
      switch (head.default.type) {
        case 'type':
          getType(head.default).forEach(line => {
            text.push(`    ${line}`)
          })
          break
        case 'tuple':
          getTuple(head.default.head).forEach(line => {
            text.push(`    ${line}`)
          })
          break
        case 'fqn':
          getFqn(head.default.head).forEach(line => {
            text.push(`    ${line}`)
          })
          break
        default:
          console.log(head.default)
          throw new Error('default')
      }
    }

    return text
  }

  function getFqn(head, lead = `like`) {
    const text = []
    if (head.type === 'fqn-name') {
      const a = paramCase(head.first)
      const b = paramCase(head.second)
      text.push(`${lead} ${a}/${b}`)
    } else {
      const castIndex = ++casts

      const a = head.first
      const aText = []
      switch (a.type) {
        case 'index-array':
          getIndexArray(a).forEach(line => {
            aText.push(line)
          })
          break
        case 'fqn':
          getFqn(a.head).forEach(line => {
            aText.push(line)
          })
          break
        case 'type':
          aText.push(`like ${paramCase(a.head.name)}`)
          gatherLikes(a.head.heads).forEach(line => {
            aText.push(`  ${line}`)
          })
          break
        case 'array':
          gatherList(a.head).forEach(line => {
            aText.push(`${line}`)
          })
          break
        case 'tuple':
          getTuple(a.head).forEach(line => {
            aText.push(`${line}`)
          })
          break
        default:
          console.log(a)
          throw new Error('err')
      }

      const b = head.second
      const bText = []
      switch (b.type) {
        case 'index-array':
          getIndexArray(b).forEach(line => {
            bText.push(line)
          })
          break
        case 'fqn':
          getFqn(b.head).forEach(line => {
            bText.push(line)
          })
          break
        case 'type':
          bText.push(`like ${paramCase(b.head.name)}`)
          gatherLikes(b.head.heads).forEach(line => {
            bText.push(`  ${line}`)
          })
          break
        case 'array':
          gatherList(b.head).forEach(line => {
            bText.push(`${line}`)
          })
          break
        case 'tuple':
          getTuple(b.head).forEach(line => {
            bText.push(`${line}`)
          })
          break
        default:
          console.log(b)
          throw new Error('err')
      }

      castText.push(`cast c-${castIndex}`)
      aText.forEach(line => {
        castText.push(`  ${line}`)
      })
      bText.forEach(line => {
        castText.push(`  ${line}`)
      })

      text.push(`${lead} c-${castIndex}/${paramCase(head.name)}`)
    }
    return text
  }

  function getIndexArray(head) {
    const text = []
    switch (head.head.type) {
      case 'type': {
        const listName = paramCase(head.head.head.name)
        text.push(`like list`)
        text.push(`  like ${listName}`)
        gatherLikes(head.head.head.heads).forEach(line => {
          text.push(`    ${line}`)
        })
        break
      }
      case 'tuple': {
        text.push(`like list`)
        text.push(`  like form`)
        getTuple(head.head.head).forEach(line => {
          text.push(`    ${line}`)
        })
        break
      }
    }
    const indexName = paramCase(head.tail)
    text.push(`  name ${indexName}`)
    return text
  }

  function getTuple(head) {
    const text = []
    text.push(`like form`)
    let t = 0
    head.forEach(item => {
      const name = `t-${++t}`
      switch (item.type) {
        case 'type':
          const like = paramCase(item.head.name)
          text.push(`  take ${name}, like ${like}`)
          break
        case 'array':
          text.push(`  take ${name}`)
          gatherList(item.head).forEach(line => {
            text.push(`    ${line}`)
          })
          break
        case 'index-array':
          text.push(`  take ${name}`)
          getIndexArray(item).forEach(line => {
            text.push(`    ${line}`)
          })
          break
        case 'fqn':
          text.push(`  take ${name}`)
          getFqn(item.head).forEach(line => {
            text.push(`    ${line}`)
          })
          break
        default:
          console.log(item)
          throw new Error('getTuple')
      }
    })
    return text
  }

  function getConst(head) {
    const text = []
    switch (head.type) {
      case 'array':
        gatherList(head.head).forEach(line => {
          text.push(line)
        })
        break
      case 'type':
        getType(head).forEach(line => {
          text.push(line)
        })
        break
      case 'fqn':
        getFqn(head.head).forEach(line => {
          text.push(line)
        })
        break
      default:
        console.log(head)
        throw new Error('oops')
    }
    text.push(`calm take`)
    return text
  }

  json.def.args.forEach(arg => {
    switch (arg.term.type) {
      case 'type': {
        const name = paramCase(arg.term.head.name)
        switch (arg.type.type) {
          case 'type': {
            argsText.push(`take ${name}`)
            getType(arg.type).forEach(line => {
              argsText.push(`  ${line}`)
            })
            break
          }
          case 'array':
            argsText.push(`take ${name}`)
            gatherList(arg.type.head).forEach(line => {
              argsText.push(`  ${line}`)
            })
            break
          case 'index-array': {
            argsText.push(`take ${name}`)
            getIndexArray(arg.type).forEach(line => {
              argsText.push(`  ${line}`)
            })
            break
          }
          case 'fqn':
            argsText.push(`take ${name}`)
            getFqn(arg.type.head).forEach(line => {
              argsText.push(`  ${line}`)
            })
            break
          case 'const': {
            argsText.push(`take ${name}`)
            getConst(arg.type.head).forEach(line => {
              argsText.push(`  ${line}`)
            })
            break
          }
          case 'never':
            argsText.push(`take ${name}, like miss`)
            break
          case 'tuple':
            argsText.push(`take ${name}`)
            getTuple(arg.type.head).forEach(line => {
              argsText.push(`  ${line}`)
            })
            break
          case undefined:
            argsText.push(`take ${name}`)
            break
          default:
            console.log(arg.type)
            throw new Error('arg.type')
            break
        }
        break
      }
      case 'tuple':
        break
    }

    if (arg.type?.prefix?.isRef) {
      argsText.push(`  cite true`)
    }
    if (arg.type?.prefix?.isMut) {
      argsText.push(`  flex true`)
    }
    if (arg.type?.prefix?.isDeref) {
      argsText.push(`  dive true`)
    }
    if (arg.type?.prefix?.isDyn) {
      argsText.push(`  dash true`)
    }
  })

  const turnText = []

  if (json.def.ret) {
    switch (json.def.ret.type) {
      case 'type':
        // turnText.push(`free seed`)
        getType(json.def.ret).forEach(line => {
          turnText.push(`${line}`)
        })
        break
      case 'tuple':
        // turnText.push(`free seed`)
        getTuple(json.def.ret.head).forEach(line => {
          turnText.push(`${line}`)
        })
        break
      case 'fqn':
        // turnText.push(`free seed`)
        getFqn(json.def.ret.head).forEach(line => {
          turnText.push(`${line}`)
        })
        break
      case 'index-array':
        // turnText.push(`free seed`)
        getIndexArray(json.def.ret).forEach(line => {
          turnText.push(`${line}`)
        })
        break
      case 'array':
        // turnText.push(`free seed`)
        gatherList(json.def.ret.head).forEach(line => {
          turnText.push(`${line}`)
        })
        break
      case 'const':
        // turnText.push(`free seed`)
        getConst(json.def.ret.head).forEach(line => {
          turnText.push(`${line}`)
        })
        break
      default:
        console.log(json.def.ret)
        throw new Error('Oops')
        break
    }
  }

  if (castText.length) {
    castText.forEach(line => {
      text.push(`  ${line}`)
    })
    text.push('')
  }

  if (leadText.length) {
    leadText.forEach(line => {
      text.push(`  ${line}`)
    })
    text.push('')
  }

  if (headText.length) {
    headText.forEach(line => {
      text.push(`  ${line}`)
    })
    text.push('')
  }

  if (argsText.length) {
    argsText.forEach(line => {
      text.push(`  ${line}`)
    })
    text.push('')
  }

  if (turnText.length) {
    turnText.forEach(line => {
      text.push(`  ${line}`)
    })
    text.push('')
  }

  return text
}

function parse(code) {
  return parser.parse(code)
}

function getLifetimeName(name) {
  if (name === '_') {
    return 'mask'
  } else if (name === 'static') {
    return 'calm'
  } else {
    return paramCase(name)
  }
}
