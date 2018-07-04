exports.toLowerCamelCase = (name, delimiter) => {
  const parse = name.split(delimiter)
  const firstWord = parse.slice(0, 1)
  const otherWord = parse.slice(1)
  const camelcase = otherWord.map(v => [
    v.slice(0, 1).toUpperCase(), v.slice(1)
  ].join('')
  ).join('')
  const word = firstWord.join('')
  return word + camelcase
}

exports.toUpperCamelCase = (name, delimiter) => {
  const parse = name.split(delimiter)
  const camelcase = parse.map(v => [
    v.slice(0, 1).toUpperCase(), v.slice(1)
  ].join('')
  ).join('')
  return camelcase
}

exports.eitherOr = (either, or) => either || or

exports.printArray = (array, prop) => {
  if (prop) array = array.map(x => x[prop])
  if (!array.length) return '[]'
  return `[ ${array.join(', ')} ]`
}
