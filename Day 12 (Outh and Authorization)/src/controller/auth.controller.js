const User = require("../models/user.model")

const jwt = require("jsonwebtoken")

require("dotenv").config()

const generateToken = (user) =>{

    return jwt.sign({user}, process.env.SECRET_KEY)
}

const register = async (req, res) =>{

    try {
        
        let user = await User.findOne({email: req.body.email})

        //checking mail

        if(user){

            return res.status(400).send({message : "Email already exists" })

        }
        
        user = await User.create(req.body)

        const token = generateToken(user)

        return res.status(200).send({user, token})

    } catch (error) {
        
        res.status(400).send(error.message)
    }
}

const login = async (req, res) =>{

    try {
        
        const user = await User.findOne({email: req.body.email})

        if(!user){

            return res.status(400).send("Wrong Email Password")
        }

        //if mail exists check for passwird
        const match = user.checkPassword(req.body.password)

        //if it doesnt match
        if(!match){

            return res.status(400).send({message : "Wrong Password"})

        }

        //if matches

        const token = generateToken(user)

        return res.status(200).send({user, token})

    } catch (error) {
        
        return res.status(400).send(error.message)
    }

}

module.exports = {register, login, generateToken}