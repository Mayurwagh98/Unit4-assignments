const express = require("express")
const router = express.Router()
const User = require("../models/user")

const transporter = require("../config/mail")
const path = require("path")

router.get("", async(req, res) =>{

    try {
        
        const page = req.query.page || 1

        const pagesize = req.query.pagesize || 10

        const skip = (page - 1) * pagesize

        const users = await User.find().skip(skip).limit(pagesize).lean().exec()

        const totalPages = Math.ceil(

            (await User.find().countDocument())
        )

        return res.status(200).send({users : users, totalPages: totalPages})
    } catch (error) {
        
        return res.status(500).send({message: error.message})
    }
})

router.post("/", async(req, res) =>{

    try {
        
        const user = await User.create(req.body)

        transporter.sendMail({

            from : `"Flipkar admin" <admin@flipkart.com>`,
            to: user.email,
            subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`,
            text: `Hi ${user.first_name}`,
            html : `Hi ${user.first_name}`
        })

        transporter.sendMail({

            from: `"Flipkar admin <admin@flipkart.com>`,
            to: ["admin1@.com","admin2@.com","admin3@.com","admin4@.com","admin5@.com"],
            subject: `${user.first_name} ${user.last_name}`,
            text: `Please welcome ${user.first_name} ${user.last_name}`,
            html : `Please welcome ${user.first_name} ${user.last_name}`
        })

        return res.status(201).send({user: user})
    } catch (error) {
        
        return res.status(500).send({message:err.message})
    }
})

module.exports = router