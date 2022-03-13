const express = require("express")
const mongoose = require("mongoose")

const app = express()
  
app.use(express.json())

const connect = () => {

    return mongoose.connect(
        "mongodb+srv://MayurWagh:mayur_123@cluster0.47rnh.mongodb.net/web15-atlas?retryWrites=true&w=majority"
    )
}

//users schema
//step1 = creae=ting the schema

const userSchema = new mongoose.Schema({

    first_name :{type: String, required:true},
    last_name : {type: String, require: true}
},{
    timestamps: true,
})

//step2 = creating model
const User = mongoose.model("user", userSchema)

//author

const authorSchema = new mongoose.Schema({
   userID : {
       type : mongoose.Schema.Types.ObjectId,

       ref: "user"
    }
},{
    timestamps: true,
})

//step2 = creating model
const Author = mongoose.model("author", authorSchema)

//books schema
const bookSchema = new mongoose.Schema({
    name : {type: String, require: true},
    body :{type: String, require: true},
    sectionId :{
        type : mongoose.Schema.Types.ObjectId,

        ref : "user"
    }
},{
    timestamps: true,
})

//mdoel
const Books = mongoose.model("book", bookSchema)

//section
const sectionSchema = new mongoose.Schema({
    name : {type: String, require: true},
    
},{
    timestamps: true,
})

//mdoel
const Section = mongoose.model("section", sectionSchema)

//user crud
app.get("/users", async(req, res) =>{

    try {
        const users = await User.find().lean().exec()

        return res.status(200).send({users: users})

    } catch (error) {
        return res.status(500).send({message: "went wrong"})
    }
})


app.post("/users", async(req, res) =>{

    try {
        const user = await User.create(req.body)
        return res.status(201).send()

    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

//getting single item
app.get("/users/:id", async(req, res) =>{

    try {
        const user = await User.findById(req.params.id)
        return res.status(200).send({user : user})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

//update
app.patch( "/users/:id", async(req, res) =>{

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).send({user : user})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

app.delete("/users/:id", async(req, res) =>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        return res.status(200).send({user : user})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }

})

//books crud
app.get("/books", async(req, res) =>{

    try {
        const book = await Books.find().lean().exec()

        return res.status(200).send({book: book})

    } catch (error) {
        return res.status(500).send({message: "went wrong"})
    }
})


app.post("/books", async(req, res) =>{

    try {
        const user = await Books.create(req.body)
        return res.status(201).send()

    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})


//section crud
app.get("/section", async(req, res) =>{

    try {
        const section = await Section.find().lean().exec()

        return res.status(200).send({section: section})

    } catch (error) {
        return res.status(500).send({message: "went wrong"})
    }
})


app.post("/section", async(req, res) =>{

    try {
        const user = await Section.create(req.body)
        return res.status(201).send()

    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

app.listen(4002, async () =>{
    try {
        await connect()    
        console.log('listening ');
    } catch (error) {
        console.log(error)
    }
    
})