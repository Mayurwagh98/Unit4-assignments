const mongoose = require("require")

//submission schema
const submissionSchema = new mongoose.Schema({

    evaluation_id:{

        type : mongoose.Schema.Type.ObjectId,

        ref : "evaluation"
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,

        ref : "user"
    },
    
    marks : {type: Number, required: true}

},{
    timestamps: true
})

//sumbmission model
const Submission = mongoose.model("submission", submissionSchema)

model.exports = Submission