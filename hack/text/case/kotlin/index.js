
const fs = require('fs')
const puppeteer = require('puppeteer')

const startUrl = 'https://kotlinlang.org/api/latest/jvm/stdlib/'
const NAME = 'dart-webgl'

const wait = ms => new Promise((res) => setTimeout(res, ms))

start()

async function start() {
  let b = await puppeteer.launch({ headless: true })
  let p = await b.newPage()
  await p.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36")

  const records = []

  await visit(startUrl)
  const visited = {}
  const urls = (await p.evaluate(getLinks))
    .filter(x => !x.match(/[#\?]/))
    .filter(x => x.match(/stdlib/))

  while (urls.length) {
    const url = urls.shift()
    if (visited[url]) continue
    await visit(url)
    visited[url] = true
    await wait(200)
    await p.evaluate(() => {
      window.scroll({
        top: 20000,
        left: 0,
        behavior: 'smooth'
      })
    })
    const nextLinks = await p.evaluate(getLinks)
    const nLinks = nextLinks
      .filter(x => !x.match(/[#\?]/))
      .filter(x => x.match(/stdlib/))
    console.log(nLinks)
    urls.push(...nLinks)
    const data = await p.evaluate(find)
    if (data) {
      console.log('  :)')
      fs.writeFileSync(`kotlin/${data.type}-${data.name}.json`, JSON.stringify(data, null, 2))
    }
  }

  fs.writeFileSync(`kotlin.csv`, Object.keys(visited).join('\n'))

  function getLinks() {
    let links = []
    all('a').forEach(a => {
      links.push(a.href)
    })

    return links

    function all(s, c) {
      return Array.prototype.slice.call((c || document).querySelectorAll(s))
    }
  }

  async function visit(u) {
    console.log(u)
    try {
      await p.goto(u)
    } catch (e) {
      console.log(e)
      try {
        await b.close()
      } catch (e) {
        b = await puppeteer.launch()
        p = await b.newPage()
      }
      await visit(u)
    }
  }

  await b.close()

  function find() {
    const data = {}
    const title = document.querySelector('article[role="main"] h1, article[role="main"] h2, article[role="main"] h2')?.textContent.trim()

    if (!title) return

    if (title.match(/Package[\s ]+(.+)/)) {
      data.type = 'package'
      data.name = RegExp.$1
    } else if (title.match(/Extensions[\s ]+for[\s ]+(.+)/)) {
      data.type = 'extensions'
      data.name = RegExp.$1
    } else {
      data.type = 'unknown'
      data.name = title
      data.signature = document.querySelector('.node-page-main .signature code')?.textContent.trim().replace(/[\s ]+/g, ' ')

      if (!data.signature) {
        data.signatures = []
        all('article[role="main"] .overload-group').forEach(x => {
          const text = x.querySelector('.signature code')?.textContent.trim().replace(/[\s ]+/g, ' ')
          if (!text) return
          const desc = x.querySelector('p')?.textContent.trim().replace(/[\s ]+/g, ' ')
          data.signatures.push({
            text,
            desc
          })
        })
      }
    }

    data.items = []

    all('.declarations .summary-group').forEach(d => {
      let desc = d.querySelector('p')?.textContent.trim().replace(/[\s ]+/g, ' ')
      let text = d.querySelector('.signature code')?.textContent.trim().replace(/[\s ]+/g, ' ')
      if (!text) return
      data.items.push({
        text,
        desc
      })
    })

    return data

    function all(s, c) {
      return Array.prototype.slice.call((c || document).querySelectorAll(s))
    }
  }
}
