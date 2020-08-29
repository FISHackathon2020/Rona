p = require("colorprint")
FUNCTIONS=["info", "warn", "debug", "trace", "error", "fatal"]
module.exports = (tag) => {
    out = {}

    FUNCTIONS.forEach(func => {
        out[func] = (message) => {
            p[func](`[${tag}] ${message}`)
        }
    })
    
    return out
}