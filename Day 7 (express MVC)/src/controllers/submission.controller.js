const express = require("express")
const crudController = require("./crud.controller")
const Submission = require("../models/submission.model")

const router = express.Router()

router.post("/", crudController.post(Submission))

router.get("", async(req, res) =>{

    try {
        
        const submissions = await Submission.find().populate({path: "evaluationId"}).populate({path: "studentsId"}).lean().exec()

        return res.status(200).send(submissions)

    } catch (error) {
        
        return res.status(500).send({message:error.message})
    }
})

router.get("/students", async(req, res) =>{

    try {
        
        const students = await Submission.find({},{studensId:1}).populate({path: "studensId"}).lean().exec()

        return res.status(200).send(students)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.get("/highscore", async(req, res) =>{

    try {
        
        const evaluation_result = await  Submission.find({}).populate({path: "studentsId"}).lean().exec()

        let topper = []

        let high = -Infinity

        const highest = evaluation_result.forEach(item =>{

            if(item.marks > high){

                topper = evaluation_result

                high = item.marks
            }
        })

        return res.status(200).send(topper)
    } catch (error) {
        
        return res.status(500).send(error)
    }
})

module.exports = router