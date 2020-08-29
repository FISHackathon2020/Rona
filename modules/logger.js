p = require("colorprint")
FUNCTIONS=["info", "warn", "debug", "trace", "error", "fatal"]
module.exports = {
    create: (tag) => {
        let out = {}
    
        FUNCTIONS.forEach(func => {
            out[func] = (message) => {
                p[func](`[${tag}] ${message}`)
            }
        })
        
        return out
    }
}