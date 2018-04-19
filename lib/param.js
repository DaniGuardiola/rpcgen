const Type = require("./type")

class Param{
    constructor(name, type, desc){
        this.name = name
        this.desc = desc
        this.type = new Type(type)
    }
}

module.exports = Param
