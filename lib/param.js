const Type = require("./type")

class Param{
    constructor(name, type, desc, value = null){
        this.name = name
        this.desc = desc
        this.type = new Type(type)
        this.value = value
    }
}

module.exports = Param
