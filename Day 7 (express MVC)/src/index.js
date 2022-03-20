const express = require("express")

const userController = require("./controllers/users.controllers")

const app = express()

app.use(express.json())

app.usr("/users", userController)

app.listen(4001, async() =>{

    try {
        await connect ()
        console.log("listening")
        
    } catch (error) {
        console.log(error);
    }
})