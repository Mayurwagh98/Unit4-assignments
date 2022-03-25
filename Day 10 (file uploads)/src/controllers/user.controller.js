const express = require("express")

const router = express.Router()

const User = require("../models/user.model")

const fs = require("fs")

const upload = require("../middleware/upload")

router.get("", async (req, res) =>{

    try {
        
        const users = await User.find().lean().exec()

        return res.status(200).send(users)

    } catch (error) {
        return res.status(500).send({message:err.message})
    }
})

router.post("", upload.single("pofilePic"), async (req, res) =>{

    try {
        
        console.log(`req.file.path:`, req.file.path)

        const user = await User.create({

            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profilePic : req.file.path
        })

        console.log("user:", user)

        return res.status(201).send(user)
    } catch (error) {
        
        return res.send(500).send({message: error.message})
    }
})

router.patch("/userId", upload.single("prifilePic"), async (req, res) =>{

    try {
        
        const data = {

            first_name : req.body.first_name,
            last_name: req.body.last_name,
            profilePic: req.file.path
        }
        //getting user
        let user = await User.findById(req.params.userId)
        //getting path to user profile pic
        let path = user.profilePic
        //deleting previous user profile pic
        fs.unlinkSync(path.toString())

        user = await User.findByIdAndUpdate(req.params.userId, data, {new: true})

        return res.status(200).send({user})

    } catch (error) {
        return res.status(500).send(error.message)   
    }

})

router.delete("/userId", async (req, res) =>{

    try {
        
        let user = await User.findById(req.params.userId)

        let path = user.profilePic

        fs.unlinkSync(path.toString())

        await User.findByIdAndDelete(req.params.userId)

        return res.status(200).send(user)

    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = router