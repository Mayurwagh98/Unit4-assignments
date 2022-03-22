const express = require("express")

const User = require("../models/user.model")

//user crud
app.get("/users", async(req, res) =>{

    try {
        
        const user = await User.find().lean().exec()

        return res.status(200).send({users : user})

    } catch (error) {
        return res.status(500).send({message : error.message})
    }
})

app.post("/users", async(req, res) =>{

    try {
        
        const user = await User.create(req.body)

        return res.status(200).send()

    } catch (error) {
        return res.status(500).send({message : error.message})
    }

})

//single item
app.get("/users/:id", async(req, res) =>{

    try {
        
        const user = await User.findById(req.params.id)

        return res.status(200).send({user : user})

    } catch (error) {
        return res.status(500).send({message : error.message})
    }

})

app.patch("/users/:id", async(req, res) =>{

    try {
        
        const user = await User.findByIdUpdate(req.params.id, req.body)

        return res.status(200).send({user : user})

    } catch (error) {
        return res.status(500).send({message : error.message})
    }

})
