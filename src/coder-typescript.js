const util = require('../lib/util')

const PRIMITIVE_TYPES = {
  object: 'object',
  any: 'object',
  int: 'number',
  float: 'number',
  number: 'number',
  string: 'string',
  void: 'void',
  boolean: 'boolean'
}

const typeScript = {
  getMethodName: (name) => {
    const w = name.split('.')
    const namespace = w.slice(0, -1)
    const method = w.slice(-1)
    return namespace.join('_') + '_' + util.toLowerCamelCase(method.join(''), '_')
  },
  getMethodParamList: (storage, isValue = false) => {
    return storage.map(param => {
      if (isValue && param.value) {
        return param.name + ': ' + typeScript.getType(param.type) + ' = ' + param.value
      } else {
        return param.name + ': ' + typeScript.getType(param.type)
      }
    })
  },
  getParamList: (storage) => {
    return storage.map(param => {
      return param.name
    })
  },
  getName: (name, aliasName = void 0) => {
    return aliasName || name
  },
  getType: (type) => {
    const w = []
    for (let i = 0; i < type.dim; ++i) {
      w.push('Array<')
    }
    w.push(typeScript._getType(type))
    for (let i = 0; i < type.dim; ++i) {
      w.push('>')
    }
    return w.join('')
  },
  _getPrimitiveType: (typeName) => {
    return PRIMITIVE_TYPES[typeName]
  },

  _getType: (type) => {
    if (type.isPrimitive) {
      return typeScript._getPrimitiveType(type.name)
    } else if (type.name.match(/tuple/)) {
      const w = type.name.split('tuple[').reverse().shift()
      return '[' + w.split(']').shift() + ']'
    }
    return 'I' + util.toUpperCamelCase(type.name, '_')
  }
}
exports.typeScript = typeScript
