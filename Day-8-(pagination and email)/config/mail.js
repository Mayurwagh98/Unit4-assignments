const nodemailer = require("nodemailer")

module.exorts = nodemailer.createTransport({

    host: "smtp.mailtrap.io",
    port : 587,
    secure: false, //true for 465, false for other ports
    auth: {

        user: "",
        pass: ""
    }
})