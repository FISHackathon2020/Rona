const log = require('../modules/logger').create("student")
const to_json = require('../modules/to_json')

module.exports = (app) => {
    find_by_id = (id) => {
        for (let item of store.students)
            if (item.id == id)
                return item
        return undefined
    }

    app.get('/students', (req, res) => {
        res.send(to_json(store.students))
        log.debug("GET students")
    })
    
    app.get('/students/add', (req, res) => {
        student = new t.Student()

        student.name = req.query.name

        store.students.push(student)
        store.tainted = true

        res.send( {id: student.id} )
        log.debug(`Added new student: ${student.id}`)
    })

    app.post('/students/add', (req, res) => {
        student = new t.Student()
        // TODO
        res.cookie("last-student-created", student.id)
    })

    //app.post('/students/add/specific')

    //app.post('/students/add/job')

    app.get('/students/:id', (req, res) => {
        student = find_by_id(req.params.id)
        if (!student)
            res.sendStatus(404)
        else
            res.send(to_json(student))
    })

    app.get('/students/:id/edit', (req, res) => {

    })

    app.get('/students/:id/delete', (req, res) => {
        student = find_by_id(req.params.id)
        store.students.rm(student)

        // TODO
    })
}