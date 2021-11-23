
module.exports = mintLoad

function mintLoad(base) {
  const road = base.link[0].text
  const load = {
    road,
    load: [],
    take: []
  }
  base.link.slice(1).forEach(link => {
    switch (link.name) {
      case `load`:
        load.load.push(mintLoad(link))
        break
      case `take`:
        load.take.push(mintTake(link))
        break
    }
  })
  return load
}

function mintTake(base) {
  const takeForm = base.link[0]
  const takeFormBase = takeForm.link[0]
  const take = {
    form: 'form-base',
    host: takeForm.name,
    base: takeFormBase.name
  }

  const saveForm = base.link[1]
  let save
  if (saveForm) {
    const saveFormBase = saveForm.link[0]
    save = {
      form: 'form-base',
      host: saveForm.name,
      base: saveFormBase.name
    }
  }

  return { form: 'take', take, save }
}
