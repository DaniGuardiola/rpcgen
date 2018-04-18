const Type = require("./type")
const util = require("./util")

const makeLowerCamelCase = ( name, delimiter ) => {
    const parse = name.split(delimiter)
    const firstWord = parse.slice(0, 1)
    const otherWord = parse.slice(1)
    const camelcase = otherWord.map(v => [
                                v.slice(0, 1).toUpperCase(), v.slice(1)
                            ].join("")
                        ).join("")
    const word = firstWord.join("")
    return word + camelcase
}

const makeUpperCamelCase = ( name, delimiter ) => {
    const parse = name.split(delimiter)
    const camelcase = parse.map(v => [
                                v.slice(0, 1).toUpperCase(), v.slice(1)
                            ].join("")
                        ).join("")
    return camelcase
}

class Param{
    constructor(name, type, desc){
        this.name = name
        this.desc = desc
        this.type = new Type(type)
    }
    functionName(){
        const w = this.name.split(".")
        const namespace = w.slice(0, -1)
        const method = w.slice(-1)
        return namespace.join("_") + "_" + util.makeLowerCamelCase(method.join(""), "_")
    }
    functionType(){
        const name = this.type.name
        return name
    }
}

module.exports = Param
