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

exports.makeUpperCamelCase = makeUpperCamelCase
exports.makeLowerCamelCase = makeLowerCamelCase
