const Type = require("./type")
const Param = require("./param")

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

class EntityStruct extends Param{
    constructor(element){
        super(element.attributes.name, element.attributes.name, element.attributes.desc)
        this.storage = []
        const childs = element.elements ? element.elements.filter(child => child.type === 'element') : []
        childs.forEach( child => {
            this.storage.push(new Param(child.attributes.name, child.attributes.type, child.attributes.desc))
        })
    }
    code(lang_coder){
        const struct_name = lang_coder.getType(this.type)
        const struct_params = lang_coder.getMethodParamList(this.storage)
        const params = lang_coder.getParamList(this.storage)
        return{ struct_name, struct_params, params }
    }
}

class EntityRequest extends Param{
    constructor(element){
        super(element.attributes.name, element.attributes.result, element.attributes.desc)
        this.dir = getdir(element.attributes.dir)
        this.storage = []
        const childs = element.elements ? element.elements.filter(child => child.type === 'element') : []
        childs.forEach( child => {
            this.storage.push(new Param(child.attributes.name, child.attributes.type, child.attributes.desc, child.attributes.default))
        })
    }
    code(lang_coder){
        const func_name = lang_coder.getMethodName(this.name)
        const func_params = lang_coder.getMethodParamList(this.storage, true)
        const func_return = lang_coder.getType(this.type)
        const params = lang_coder.getParamList(this.storage)
        return{ func_name, func_params, params, func_return }
    }
}

class EntityNotification extends Param{
    constructor(element){
        super(element.attributes.name, "any", element.attributes.desc)
        this.dir = getdir(element.attributes.dir)
        this.storage = []
        const childs = element.elements ? element.elements.filter(child => child.type === 'element') : []
        childs.forEach( child => {
            this.storage.push(new Param(child.attributes.name, child.attributes.type, child.attributes.desc))
        })
    }
    code(lang_coder){
        const func_name = lang_coder.getMethodName(this.name)
        const func_params = lang_coder.getMethodParamList(this.storage)
        const params = lang_coder.getParamList(this.storage)
        return{ func_name, func_params, params }
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

