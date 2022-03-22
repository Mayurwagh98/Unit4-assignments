const mongoose = require("require")

//batch shcema
const batchSchema = new mongoose.Schema({

    Batch_name : {type: String, required: true},
},{
    timestamps : true
})

//batch model
const Batch = mongoose.model("batchId", batchSchema)

model.exports = Batch