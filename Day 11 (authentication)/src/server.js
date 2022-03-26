const app = require("./index")

const connect = require("./configs/db")

app.listen(4000, () =>{

    try {
        
        connect()
        
        console.log("litening")

    } catch (error) {
        console.log(error)
    }
})