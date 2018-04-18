const xml2json = require('xml-js').xml2json
const nunjucks = require('nunjucks')
const fs = require("fs")

const IDL = require("./idl")

class App {
    constructor(filename){
        this.filename = filename
        this.idl = null
    }
    parse(){
        const xmlfile = fs.readFileSync(this.filename, "utf8")
        const result = JSON.parse(xml2json(xmlfile, {compact: false, spaces: 4}));
        result.elements.forEach(element => {
            this.idl = new IDL(element)
        })
    }
    build(file){
        const tmplfile = fs.readFileSync(file, "utf8")
        const template = nunjucks.compile(tmplfile);
        const output = template.render(this.idl)
        return output
    }
}

module.exports = App
