const log = require('../modules/logger').create("jobs")
const to_json = require('../modules/to_json')

var router = require("express").Router()

find_by_id = (id) => {
    for (let item of store.job_offers)
        if (item.id == id)
            return item
    return undefined
}

router.get("/", (req, res) => {
    res.send(to_json(store.job_offers))
    log.debug("GET job_offers")
})

router.post("/add", (req, res) => {
    offer = new t.JobOffer()

    // TODO

    store.job_offers.push(offer)
    store.tainted = true

    res.cookie("studentid", student.id)
    res.send( { id: student.id } )
    log.debug(`Added new student: ${student.id}`)
})

router.post("/add/specific", (req, res) => {
    student = find_by_id(req.cookies.studentid)
    
    // TODO

    store.tainted = true
    log.debug(`Extended student: ${student.id}`)
})

router.post("/add/job", (req, res) => {
    student = find_by_id(req.cookies.studentid)
    
    // TODO

    store.tainted = true
    log.debug(`Finalized student: ${student.id}`)
})

router.get("/:id", (req, res) => {
    if (req.params.id == "current")
        id = req.cookies.studentid
    else
        id = req.params.id
    student = find_by_id(id)

    if (!student)
        res.sendStatus(404)
    else
        res.send(to_json(student))
})

// TODO: Edit, Delete, Etc

module.exports = router