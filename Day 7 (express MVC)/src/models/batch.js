const mongoose = require("require")

//batch shcema
const batchSchema = new mongoose.Schema({

    Batch_name : {type: String, required: true},
},{
    timestamps : true
})

//batch model
const Batch = mongoose.model("batch", batchSchema)

model.exports = Batch