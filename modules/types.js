function genid() {
    return Math.random().toString(36).substring(2, 10)
}

const UNSET = "UNSET"

// Not private so that it can be check in to_json
class Profile {
    constructor() {
        this.id = genid()
        this.name = UNSET // String
        this.profile_picture = UNSET // URI
        this.profile_banner = UNSET // URI
    }
}
module.exports.Profile = Profile

// Private
class Person extends Profile {
    constructor() {
        super()
        this.phone_number = UNSET
        this.email = UNSET
        this.interests = [] // Set of string
        this.skills = []    // Set of string
        this.member_of = [] // Set of Org
        this.friends = []   // Set of Person
    }
}

class Student extends Person {
    constructor() {
        super()
        this.clubs = []  // Set of Club
        this.major = UNSET  // String
        this.school = UNSET // University
        this.grad_year = UNSET

        this.expected_pay = UNSET
        this.experience = UNSET
        this.pref_atmosphere = []
    }
}
module.exports.Student = Student

class Recruiter extends Person {
    constructor() {
        super()
        this.manages = [] // Set of JobOffer
        this.company = UNSET // The company they are recruiting for
        this.fields = []  // The fields that the recruiter specializes in
    }
}
module.exports.Recruiter = Recruiter

// Private
class Org extends Profile {
    constructor() {
        super()
        this.members = [] // Set of Person
    }
}

class Club extends Org {
    constructor() {
        super()
        this.fields = []     // Is this club related to CS, video games, art, etc
        this.university = UNSET // The university this club belongs to
    }
}
module.exports.Club = Club

class University extends Org {
    constructor() {
        super()
        this.majors = []
        this.clubs = []
        this.students = new Student()
    }
}
module.exports.University = University

class Employer extends Org {
    constructor() {
        super()
        this.employees = []
        this.recruiters = []
        this.offers = []
    }
}
module.exports.Employer = Employer

class JobOffer {
    constructor() {
        this.id = genid()
        this.name = UNSET
        this.hours = []
        this.salary = UNSET
        this.location = UNSET
        this.dresscode = UNSET
        this.atmosphere = [] // busy, professional, casual, etc, etc
        this.employer = UNSET
        this.recruiters = []
        this.fields = []
        this.interested_students = []
    }
}
module.exports.JobOffer = JobOffer