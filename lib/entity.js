const Type = require("./type").Type
const Param = require("./type").Param

const DIRECTION_TYPE = {
    CLIENT: 0,
    SERVER: 1,
    BOTH: 2,
}

const getdir = (dir) => {
    switch(dir){
    case "client":
        return DIRECTION_TYPE.CLIENT
    case "server":
        return DIRECTION_TYPE.SERVER
    case "both":
        return DIRECTION_TYPE.BOTH
    default:
        break;
    }
    throw new Error("direction error: " + dir)
}


class EntityStruct{
    constructor(element){
        this.name = element.attributes.name
        this.storage = []
        const childs = element.elements ? element.elements.filter(child => child.type === 'element') : []
        childs.forEach( child => {
            this.storage.push(new Param(child.attributes.name, child.attributes.type, child.attributes.desc))
        })
    }
}

class EntityRequest{
    constructor(element){
        this.name = element.attributes.name
        this.desc = element.attributes.desc
        this.dir = getdir(element.attributes.dir)
        this.type = new Type(element.attributes.result)
        this.storage = []
        const childs = element.elements ? element.elements.filter(child => child.type === 'element') : []
        childs.forEach( child => {
            this.storage.push(new Param(child.attributes.name, child.attributes.type, child.attributes.desc))
        })
    }
    functionName(){
        const w = this.name.split(".")
        const namespace = w.slice(0, -1)
        const method = w.slice(-1)
        return namespace.join("") + "_" + method
    }
    functionType(){
        const name = this.type.name
        return name
    }
}

class EntityNotification{
    constructor(element){
        this.name = element.attributes.name
        this.desc = element.attributes.desc
        this.dir = getdir(element.attributes.dir)
        this.storage = []
        const childs = element.elements ? element.elements.filter(child => child.type === 'element') : []
        childs.forEach( child => {
            this.storage.push(new Param(child.attributes.name, child.attributes.type, child.attributes.desc))
        })
    }
}

const factory = (type, element) => {
    switch(type){
    case "request": return new EntityRequest(element)
    case "notification": return new EntityNotification(element)
    case "struct": return new EntityStruct(element)
    }
    throw new Error("unknown type: " + type)
}

module.exports = factory

