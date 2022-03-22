const mognoose = require("mongoose")

const userSchema = new mognoose.Schema({

    first_name : {type: String, required: true},
    last_name : {type: String, require: false},
    email : {type: String, required: true}
},{
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)