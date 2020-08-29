function _to_json_obj(obj, toplevel) {
    if (typeof obj !== 'object') { // We can't traverse these any more
        return obj
    } else if (obj instanceof Array) { // Keep the array, just parse the objects in it
        new_arr = []
        obj.forEach(it => {
            new_arr = new_arr.concat(_to_json_obj(it, toplevel))
        })  
        return new_arr
    } else if (!toplevel && obj.hasOwnProperty("id")) { // Replace references with IDs
        return obj.id
    } else { // Copy over anything not covered above
        let clone = {...obj}
        for (let key in clone)
            clone[key] = _to_json_obj(clone[key], false)
        return clone
    }
}

module.exports = (obj) => JSON.stringify(_to_json_obj(obj, true))
