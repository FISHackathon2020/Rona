const log = require('../modules/logger').create("student")
const to_json = require('../modules/to_json')
const store = require('../modules/store')

var router = require("express").Router()

find_by_id = (id) => {
    for (let item of store.students)
        if (item.id == id)
            return item
    return undefined
}

router.get("/", (req, res) => {
    res.send(to_json(store.students))
    log.debug("GET students")
})

laststudent=undefined

router.get("/login", (req, res) => {
    res.cookie("studentid", req.body.id)
})

router.get("/add", (req, res) => {
    student = new t.Student()

    student.name = req.query.name
    student.school = req.query.school
    student.grad_year = req.query.gradyear
    student.email = req.query.email

    store.students.push(student)
    laststudent = student

    //res.send( { id: student.id } )
    res.redirect('../../specific.html')
    log.debug(`Added new student: ${student.id}`)
})

router.get("/add/specific", (req, res) => {
    log.info("Skills:" + req.query.skills)
    student = laststudent
    
    student.phone_number = req.query.phone
    student.major = req.query.major
    student.interests = req.query.interests.split(",")

    student.skills = []
    if (req.query.pds == "on") student.skills.push("pds")
    if (req.query.emu == "on") student.skills.push("emu")
    if (req.query.alg == "on") student.skills.push("alg")
    if (req.query.dat == "on") student.skills.push("dat")

    res.redirect('../../../job.html')
    log.debug(`Extended student: ${student.id}`)
})

router.get("/add/job", (req, res) => {
    student = laststudent
    
    student.expected_pay = req.query.pay
    student.experience = req.query.exp.split(",")
    
    student.pref_atmosphere = []
    if (req.query.casu == "on") student.pref_atmosphere.push("pds")
    if (req.query.prof == "on") student.pref_atmosphere.push("prof")
    if (req.query.busy == "on") student.pref_atmosphere.push("busy")
    if (req.query.flex == "on") student.pref_atmosphere.push("flex")

    store.tainted = true // Write the changes to disk
    res.redirect('../../../swipe.html')
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