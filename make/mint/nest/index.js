
module.exports = mintNest

function mintNest(base) {
  return {
    form: 'nest',
    stem: [
      {
        form: 'term',
        name: base.name
      }
    ]
  }
}
