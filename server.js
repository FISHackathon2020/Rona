const saveload = require("./modules/saveload")
const log = require("./modules/logger").create("server")
const express = require("express")
//const parser = require("body-parser")
const to_json = require("./modules/to_json")

log.info("Starting...")
var app = express()

// Initialize the store & the type system
//if (saveload.exists())
    //global.store = saveload.load()
//else
    global.store = require("./modules/store")
global.t = require("./modules/types")

log.trace("OPERATING ON STORE: " + to_json(store))

// Util function to delete a value from an array
Array.prototype.rm = function(value){
    var index = this.indexOf(value);
    if (index > -1) {
      this.splice(index, 1);
    }
    return this;
}

// Every second, check if the store needs to be backed up
setInterval(() => {
    if (store.tainted) {
        store.tainted = false

        // Deduplicate everything in the store
        // TODO
        //store.deduplicate();

        saveload.save(store)
    }
}, 1000)

// Just assume anything we'll be sending back is JSON
app.use((req, res, next) => {
    res.set("Content-Type", "application/json")
    next()
})

// Decode POST data
//app.use(parser.urlencoded({extended: true}))

// Wire up the various endpoints
app.get("/", (req, res) => res.send(to_json(store)))
app.use("/students", require("./routers/students"))
app.use("/job_offers", require("./routers/jobs"))

// To mark interest:
// GET BACKEND/students/<STUDENT_ID>/tag_job?interest=y&jobid=<JOB_ID>
// To mark disinterest:
// GET BACKEND/students/<STUDENT_ID>/tag_job?interest=n&jobid=<JOB_ID>

// Start the server
const PORT = 81
app.listen(PORT, () => log.info(`Listening on port ${PORT}`))
