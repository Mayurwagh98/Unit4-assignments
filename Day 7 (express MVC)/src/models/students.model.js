const mongoose = require("require")

//student schema
const studentSchema = new mongoose.Schema({

    roll_id : {type: Number, required: true},
    current_batch : {type: String, required : false},
},{
    timestamps: true
})

//student model
const Student = mongoose.model("student", studentSchema)

model.exports = Student