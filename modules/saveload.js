//const stringify = require("javascript-stringify").stringify
const json = require("circular-json")
//const ser = require("teleport-javascript")
//const Flatted = require('flatted');
//const pickle = require("./pickle")
//const cryo = require("cryo")
const fs = require("fs")
const log = require("./logger").create("saveload")

module.exports = {
    save: (obj, callback) => {
        log.info("Saving data...")
        data = json.stringify(obj)
        //, (key, value) => {
        //     if (typeof value == 'object' && value instanceof Set)
        //         return Array.from(value)
        //     else
        //         return value
        // })
        //data = pickle.dumps(obj)
        //data=cryo.stringify(obj)
        // data = Flatted.stringify(obj, (key, value) => {
        //             if (value instanceof Set)
        //                 return Array.from(value)
        //             else
        //                 return value
        //         }) 
            
        
        //, null, null, { references: true })
        //data = ser.stringify(obj)
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
        //obj = ser.parse(data)
        //obj = Flatted.parse(data)
        obj = json.parse(data)
        //obj = pickle.loads(data)
        // , (key, value) => {
        //     if (value instanceof Array)
        //         return new Set(value)
        //     else
        //         return value
        // })

        // obj = json.parse(data, (key, value) => {
        //     if (typeof value == 'object' && value instanceof Array)
        //         return new Set(value)
        //     else
        //         return value
        // })
        //obj = Flatted.parse(data)
        //obj = eval(`(${data})`)
        log.info("Deserialized data. Done.")
        return obj
    },

    exists: () => fs.existsSync("./save.db")
}