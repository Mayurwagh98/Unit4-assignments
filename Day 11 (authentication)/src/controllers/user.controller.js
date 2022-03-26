const express = require("express")

const router = express.Router()

const User = require("../models/users.model")

router.get("/", async (req, res) =>{

    try {
        
        const users = await User.find().lean().exec()

        return res.status(200).send(users)

    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post("/", async (req, res) =>{

    try{

        const user = await User.create(req.body)

        return res.status(200).send(users)
    }
    catch(error){
        return res.status(500).send(error)
    }
})

module.exports = router