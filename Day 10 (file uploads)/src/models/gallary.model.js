const mongoose = require("mongoose")

const gallarySchema = new mongoose.Schema({

    profilePic: [{type: String, reqquired: true}],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "user",

        required: true
    }
},{

    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("gallary", gallarySchema)