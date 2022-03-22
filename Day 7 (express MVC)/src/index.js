const express = require("express")

const userController = require("./controllers/users.controllers")
const studentCotroller = require("./controllers/studentController")
const batchController = require("./controllers/batchController")
const evaluationController = require("./controllers/evaluationController")
const submissionController = require("./controllers/submissionController")

const app = express()

app.use(express.json())

app.user("/users", userController)
app.use("/students", studentController)
app.use("/batches", batchController)
app.use("/evaluations", evaluationController)
app.use("/submission", submissionController)


app.listen(4001, async() =>{

    try {
        await connect ()
        console.log("listening")
        
    } catch (error) {
        console.log(error);
    }
})