const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    first_name : {type: String, require: true},
    last_name: {type: String, required: true},
    email: {type:String, required: true},
    pincode: {type: Number, required: true},
    age: {type: Number, required: true},
    gender: {type: String, required: true, enum: ["Male", "Female", "Other"]}
})

module.exports = mongoose.model("user", userSchema)