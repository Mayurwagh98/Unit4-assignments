const express = require("express")

const app = express()

const userController = require("./controllers/user.controller")

const connect = require("./configs/db")

app.use(express.json())

app.use("/users", userController)

app.listen(4000, async() =>{

    try {
        
        await connect()

        console.log("listening")

    } catch (error) {
        
        console.log(error);
    }
})

module.exports = app