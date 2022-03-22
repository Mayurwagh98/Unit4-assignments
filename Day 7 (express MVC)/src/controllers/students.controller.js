const express = require("express")
const crudController = require("./crud.controller")
const Student = require("../models/student.model")
const router = express.Router()

router.post("/", crudController.post(Student))

router.get("", async(req, res) =>{

    try {
        const students = await Student.find().populate({path:"userId"}).lean().exec()
        return res.status(200).send(students)
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

module.exports = router