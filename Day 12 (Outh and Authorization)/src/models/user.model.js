const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({

    email: {type: String, required: true},
    password: {type: String, required: true},
    category: [{type: String, required: true}] //user can belong to many category
},{
    timestamps: true,
    versionKeyL: false
})

userSchema.pre("save", (next) =>{

    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

userSchema.methods.checkPassword = (password) =>{

    return bcrypt.compareSync(password, this.password)    
}

const User = mongoose.model("user", userSchema)

module.exports = User