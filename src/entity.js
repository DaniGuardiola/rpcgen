const Param = require('../lib/param')

const DIRECTION_TYPE = {
  CLIENT: 0,
  SERVER: 1,
  BOTH: 2
}

const getdir = (dir) => {
  switch (dir) {
    case 'client':
      return DIRECTION_TYPE.CLIENT
    case 'server':
      return DIRECTION_TYPE.SERVER
    case 'both':
      return DIRECTION_TYPE.BOTH
    default:
      break
  }
  throw new Error('direction error: ' + dir)
}

class EntityStruct extends Param {
  constructor (element) {
    super(element.attributes.name, element.attributes.name, element.attributes.desc)
    this.storage = []
    const childs = element.elements ? element.elements.filter(child => child.type === 'element') : []
    childs.forEach(child => {
      this.storage.push(new Param(child.attributes.name, child.attributes.type, child.attributes.desc))
    })
  }
  code (langCoder) {
    const structName = langCoder.getType(this.type)
    const structParams = langCoder.getMethodParamList(this.storage)
    const params = langCoder.getParamList(this.storage)
    return { structName, structParams, params }
  }
}

class EntityRequest extends Param {
  constructor (element) {
    super(element.attributes.name, element.attributes.result, element.attributes.desc)
    this.dir = getdir(element.attributes.dir)
    this.alias = element.attributes.alias
    this.storage = []
    const childs = element.elements ? element.elements.filter(child => child.type === 'element') : []
    childs.forEach(child => {
      this.storage.push(new Param(child.attributes.name, child.attributes.type, child.attributes.desc, child.attributes.default))
    })
  }
  code (langCoder) {
    const requestName = langCoder.getName(this.name, this.alias)
    const funcName = langCoder.getMethodName(this.name)
    const funcParams = langCoder.getMethodParamList(this.storage, true)
    const funcReturn = langCoder.getType(this.type)
    const params = langCoder.getParamList(this.storage)
    return { funcName, funcParams, params, funcReturn, requestName }
  }
}

class EntityNotification extends Param {
  constructor (element) {
    super(element.attributes.name, 'any', element.attributes.desc)
    this.dir = getdir(element.attributes.dir)
    this.storage = []
    const childs = element.elements ? element.elements.filter(child => child.type === 'element') : []
    childs.forEach(child => {
      this.storage.push(new Param(child.attributes.name, child.attributes.type, child.attributes.desc))
    })
  }
  code (langCoder) {
    const funcName = langCoder.getMethodName(this.name)
    const funcParams = langCoder.getMethodParamList(this.storage)
    const params = langCoder.getParamList(this.storage)
    return { funcName, funcParams, params }
  }
}

const factory = (type, element) => {
  switch (type) {
    case 'request': return new EntityRequest(element)
    case 'notification': return new EntityNotification(element)
    case 'struct': return new EntityStruct(element)
  }
  throw new Error('unknown type: ' + type)
}

module.exports = factory
