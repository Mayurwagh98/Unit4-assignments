const mongoose = require("require")

//Evaluation schema
const evaluationSchema = new mongoose.Schema({

    date_of_evaluation: {type: String, required: true},
    instructor : {type: String, required: false},
    batch_id: {

        type : mongoose.Schema.Types.ObjectId,
        
        ref: "batch"
    }
})

//evaluation model
const Evaluation = mongoose.model("evaluation", evaluationSchema)

model.exports = Evaluation