const fs = require('fs')
const data = require('./data.json')

exports.show = function(req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    })

    if(!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        age: "",
        services: foundInstructor.services.split(","),
        created_at: "",
    }

    return res.render("instructors/show", {instructor})
}



exports.post = function(req, res) {

    //estrutura de validação
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "") {
            return res.send('Please fill all fields!')
        }
    }

    let {avatar_url, birth, name, services, gender} = req.body

    req.body.birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)


    data.instructors.push({
        avatar_url,
        birth,
        gender,
        services,
        created_at,
        id,
        name,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error")
        }else{
            return res.redirect("/instructors")

        }
        
    })

    //return res.send(req.body)
}