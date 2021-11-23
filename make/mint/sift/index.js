
const mintMake = require('../make')
const { findName } = require('../name')
const mintNest = require('../nest')

module.exports = mintSift

function makeText(base) {
  let link = base.link[0]
  if (link.form === 'mark') {
    return {
      form: `sift-mark`,
      mark: link.mark
    }
  }
  if (link.form === 'text') {
    return {
      form: `sift-text`,
      text: link.link[0].text
    }
  }
  switch (link.name) {
    case `cord`:
      return {
        form: `sift-cord`,
        text: link.link[0].text
      }
    case `text`:
      return makeText(link)
    case `mark`:
      return {
        form: `sift-mark`,
        mark: link.link[0].mark
      }
    default:
      throw JSON.stringify(link)
  }
}

function mintSift(base) {
  switch (base.name) {
    case `cord`:
      return {
        form: `sift-cord`,
        text: base.link[0].text
      }
    case `text`:
      return makeText(base)
    case `mark`:
      return {
        form: `sift-mark`,
        mark: base.link[0].mark
      }
    case `size`:
      return {
        form: `sift-mark`,
        mark: base.link[0].mark
      }
    case `code`:
      return {
        form: `sift-code`,
        code: base.code
      }
    case `form`:
      return {
        form: `form-link`,
        name: findName(base)
      }
    case 'link':
      return {
        form: 'link',
        link: base.link[0]
      }
    case `make`:
      return mintMake(base);
    case `call`:
      return mintSift.mintCall(base);
    default:
      throw JSON.stringify(base)
  }
}
