const entity = require('./entity')
const util = require('./util')
const typescript = require('./coder-typescript').typeScript

class IDL {
  constructor (hash, root) {
    this.name = root.attributes.name
    this.version = root.attributes.version
    this.struct = []
    this.request = []
    this.notification = []
    this.util = util
    this.coder = { typescript }
    this.document = {
      hash: hash
    }

    const childs = root.elements.filter(child => child.type === 'element')
    childs.forEach(child => this.dispatch(child))
  }
  dispatch (element) {
    switch (element.name) {
      case 'request':
        this.request.push(entity('request', element))
        break
      case 'notification':
        this.notification.push(entity('notification', element))
        break
      case 'struct':
        this.struct.push(entity('struct', element))
        break
      default:
        throw new Error('unknown name: ' + element.name)
    }
  }
}

module.exports = IDL
