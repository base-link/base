
// create LinkScript AST
// the link script AST is forks
// create JavaScript AST
// filter out variable declarations that don't get used
// lace the JS AST into text

function make(base) {
  const program = makeJSProgram()
  base.site.forEach(site => {
    if (site.file) {
      makeLinkFile(program, site.file)
    }
  })
  return program
}

function makeLinkFile(program, file) {

}

function makeJSProgram() {
  return {
    type: 'program',
    import: [],
    statement: []
  }
}
