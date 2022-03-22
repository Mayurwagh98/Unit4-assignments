const mongoose = require("require")
//user schema

const userSchema = new mongoose.Schema({

    firstName : {type: String, required: true},
    lastName : {type: String, required: false},
    gender : {type: String, required: true},
    dateOfBirth : {type: String, required: false},
    type : {type:String, required: true}
},{
    timestamps: true
})

//user model
const User = mongoose.model("user", userSchema)

modle.exports = User