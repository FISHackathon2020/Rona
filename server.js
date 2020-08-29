saveload = require("./modules/saveload")
log = require("./modules/logger")("server")
express = require("express")

log.info("Starting...")
var app = express()

// Initialize some global variables
global.store = require("./modules/store")
global.t = require("./modules/types")

app.get('/', (req, res) => {

    res.send("Hello world!")
})

const PORT = 8080
app.listen(PORT, () => log.info(`Listening on port ${PORT}`))
