json = require("circular-json")
fs = require("fs")
log = require("./logger")("saveload")

module.exports = {
    save: (obj, callback) => {
        log.info("Saving data...")
        data = json.stringify(obj)
        log.info("Serialized data.")
        fs.writeFile("./save.db", data, (err) => {
            if (err) throw err;
            log.info("Wrote data to disk. Done.")
            if (callback) callback() 
        })
    },

    load: () => {
        log.info("Loading data...")
        data = fs.readFileSync("./save.db")
        log.info("Read data from disk.")
        obj = json.parse(data)
        log.info("Deserialized data. Done.")
        return obj
    }
}