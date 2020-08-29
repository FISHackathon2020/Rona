const saveload = require("./modules/saveload")
const log = require("./modules/logger").create("server")
const express = require("express")
const to_json = require("./modules/to_json")

log.info("Starting...")
var app = express()

// Initialize the store & the type system
if (saveload.exists())
    global.store = saveload.load()
else
    global.store = require("./modules/store")
global.t = require("./modules/types")

// Every second, check if the store needs to be backed up
setInterval(() => {
    if (store.tainted) {
        store.tainted = false
        saveload.save(store)
    }
}, 1000)

// Just assume anything we'll be sending back is JSON
app.use((req, res, next) => {
    res.append("Content-Type", "application/json")
    next()
})

// Wire up the various endpoints
app.get("/", (req, res) => res.send(to_json(store)))
require("./routers/student")(app)

// Start the server
const PORT = 8081
app.listen(PORT, () => log.info(`Listening on port ${PORT}`))
