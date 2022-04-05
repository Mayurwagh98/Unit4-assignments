const express = require("express")

const app = express()

const connect = require("./configs/db")

app.listen(4000, async () =>{

    try {
        
        await connect()

        console.log("listening")

    } catch (error) {
        
        console.log(error)
    }
})

module.exports = app