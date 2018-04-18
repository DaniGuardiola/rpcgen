const App = require("../lib/app")

const main = () => {

    const x = new App("./protocol.xml")
    x.parse()
    const o = x.build("./protocol.ts.tmpl")
    console.log(o)
}


main()

