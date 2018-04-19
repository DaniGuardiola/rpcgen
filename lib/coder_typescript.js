const util = require("./util")

const typeScript = {
    getMethodName: (name) => {
        const w = name.split(".")
        const namespace = w.slice(0, -1)
        const method = w.slice(-1)
        return namespace.join("_") + "_" + util.makeLowerCamelCase(method.join(""), "_")
    },
    getMethodParamList: (storage, is_value = false) => {
        return storage.map( param => {
            if(is_value && param.value){
                return param.name + ': ' + typeScript.getType(param.type) + ' = ' + param.value
            } else {
                return param.name + ': ' + typeScript.getType(param.type) 
            }
        })
    },
    getParamList: (storage) => {
        return storage.map( param => {
            return param.name 
        })
    },
    getName: (name, alias_name = void 0) => {
        return alias_name ? alias_name : name
    },
    getType: (type) => {
        const name = type.name
        const w = []
        for(let i = 0; i < type.dim; ++i){
            w.push("Array<")
        }
        w.push(typeScript._getType(type))
        for(let i = 0; i < type.dim; ++i){
            w.push(">")
        }
        return w.join("")
    },
    _getPrimitiveType: (type_name) => {
        const tbl = {
            object: "object",
            any: "object",
            int: "number",
            float: "number",
            number: "number",
            string: "string",
            void: "void",
            boolean: "boolean",
        }
        return tbl[type_name]
    },

    _getType: (type) => {
        if(type.isPrimitive){
            return typeScript._getPrimitiveType(type.name)
        }else if(type.name.match(/tuple/)){
            const w = type.name.split("tuple[").reverse().shift()
            return "[" + w.split("]").shift() + "]"
        }
        return "I" + util.makeUpperCamelCase(type.name, "_")
    },
}
exports.typeScript = typeScript
