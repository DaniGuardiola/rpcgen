const xml2json = require('xml-js').xml2json
const nunjucks = require('nunjucks')
const fs = require('fs')
const crypto = require('crypto')

const IDL = require('./idl')

class App {
  constructor (filename) {
    this.filename = filename
    this.idl = null
  }
  parse () {
    const xmlfile = fs.readFileSync(this.filename, 'utf8')
    const hash = crypto.createHash('sha256').update(xmlfile).digest('hex')
    const result = JSON.parse(xml2json(xmlfile, {compact: false, spaces: 4}))
        const element = result.elements.shift()
    this.idl = new IDL(hash, element)
  }
  build (file) {
    const tmplfile = fs.readFileSync(file, 'utf8')
    const template = nunjucks.compile(tmplfile)
        const output = template.render(this.idl)
    return output
  }
}

module.exports = App
