function genid() {
    return Math.random().toString(36).substring(2, 10)
}

// Not private so that it can be check in to_json
class Profile {
    constructor() {
        this.id = genid()
        this.name = undefined // String
    }
}
module.exports.Profile = Profile

// Private
class Person extends Profile {
    constructor() {
        super()
        this.phone_number = undefined
        this.email = undefined
        this.interests = new Set() // Set of string
        this.skills = new Set()    // Set of string
        this.member_of = new Set() // Set of Org
        this.friends = new Set()   // Set of Person
    }

    destroy() {
       console.log("Destroying person")
    }
}

class Student extends Person {
    constructor() {
        super()
        this.clubs = new Set()  // Set of Club
        this.major = undefined  // String
        this.school = undefined // University
    }
}
module.exports.Student = Student

class Recruiter extends Person {
    constructor() {
        super()
        this.manages = new Set() // Set of JobOffer
        this.company = undefined // The company they are recruiting for
        this.fields = new Set()  // The fields that the recruiter specializes in
    }
}
module.exports.Recruiter = Recruiter

// Private
class Org extends Profile {
    constructor() {
        super()
        this.members = new Set() // Set of Person
    }
}

class Club extends Org {
    constructor() {
        super()
        this.fields = new Set()     // Is this club related to CS, video games, art, etc
        this.university = undefined // The university this club belongs to
    }
}
module.exports.Club = Club

class University extends Org {
    constructor() {
        super()
        this.majors = new Set()
        this.clubs = new Set()
        this.students = new Student()
    }
}
module.exports.University = University

class Employer extends Org {
    constructor() {
        super()
        this.employees = new Set()
        this.recruiters = new Set()
        this.offers = new Set()
    }
}
module.exports.Employer = Employer

class JobOffer {
    constructor() {
        this.name = undefined
        this.hours = new Set()
        this.salary = undefined
        this.location = undefined
        this.dresscode = undefined
        this.atmosphere = undefined // busy, professional, casual, etc, etc
        this.employer = undefined
        this.recruiters = new Set()
        this.fields = new Set()
    }
}
module.exports.JobOffer = JobOffer