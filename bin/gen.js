#!/usr/bin/env node
const App = require("../lib/app")

const main = () => {

    const app = new App("./fixture/protocol.xml")
    app.parse()
    const o = app.build("./fixture/protocol.ts.tmpl")
    console.log(o)
}


main()

