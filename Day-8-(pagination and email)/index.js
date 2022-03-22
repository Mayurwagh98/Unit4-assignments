const express = require("express")
const app = express()

const userController = require("./controller/user.controller")

const connect = require("./config/db")

app.use(express.json())

app.use("/users", userController)

app.uselisten(4000, async() =>{

    try{

        await connect()

        console.log("listening")
    }
    catch(error){

        console.log(error)
    }
})

module.exports = app