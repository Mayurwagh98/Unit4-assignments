const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name: {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true}
},{
    timestamps: true,
    versionKey: false
})

userSchema.pre("save", () =>{

    const salt = bcrypt.genSaltSync(saltRounds)

    const hash = bcrypt.hashSync(myPlaintextPassword, salt)
})

module.exports = mongoose.model("user", userSchema)