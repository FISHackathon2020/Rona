function to_json(obj) {
    if (obj instanceof Set) {
        let out = "["
        for (let item of obj)
            out += _to_json(item)
        return out + "]"
    } else return _to_json(obj)
}

function _to_json(obj) {
    return JSON.stringify(obj, (key, value) => {   
         if (value && value.id)
             foo=value.id
         else
             foo=""
        console.log(`Key: ${typeof key}, ID: ${foo}, THIS: ${typeof this}`)
        console.log(this)

        if (key && !(this instanceof Array) && value instanceof t.Profile) // Don't convert urself to just an ID too
            return value.id
        else if (value instanceof Set) // All sets need to be converted to arrays for JSON.stringify to work
            return Array.from(value)
        else
            return value
    })
}

function set_to_array(obj) {
    if (obj instanceof Set) {
        return Array.from(obj)
    }
    

    for (let key in obj) {
        
    }
}


module.exports = to_json
// module.exports = {
//     to_json: to_json,
//     //set_to_array: set_to_array,
//     //array_to_set: array_to_set
// }



