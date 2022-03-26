const User = require("../models/users.model")

//function to reg user
const register = async (req, res) =>{

    try {
        
        //check mail is present or not

        let user = await User.findOne({email: req.body.email})
        //if mail is pressent in db
        if(user){
            
            return res.status(200).send("Email is already is present")
        }
        //if not present then create one
        user = await User.create(req.body)

        return res.status(200).send(user)
    } catch (error) {
        
        return res.status(500).send(err)
    }
}

const login = async (req, res) =>{

    try {
        
        const user = await User.findOne({email: req.body.email})

        if(user){

            return res.status(200).send("Logged in!");
        }
        return res.status(200).send("Incorrect email or password");
    } catch (error) {
        return res.status(500).send(error)   
    }
}

module.exports = {register, login}