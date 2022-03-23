const express = require("express")

const {body, valiadationResult} = require("express-validator")

const router = express.Router()

const User = require("../models/user.model")

router.get("", async (req, res) =>{

    try {
        
        const users = await User.find().lean().exec()

        return res.status(200).send({users: users})

    } catch (error) {
        
        return res.status(500).send({message: error.message})
    }
})

router.post("/", 
    body("first_name").trim()
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .isLength({min: 4})
    .withMessage("First name must be at least 4 characters"),

    //last name
    body("last_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage(`Last name can't be empty`)
    .isLength({min: 4})
    .withMessage(`Last name must be atleast 4 charters`),

    //email
    body("email")
    .isEmail()
    .custom(async (value) =>{

        const user = await User.findOne({email: value})

        if(user){

            throw new Error("Email is already exists")
        }

        return true
    }),

    //age
    body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be between 1 and 100")
    .custom((value) =>{

        if(value < 1 || value > 100){
             
            throw Error("Age is incorrect")
        }
        
        return true
    }),

    //gender
    body("gender")
    .not()
    .isEmpty()
    .withMessage(`Gender can't be empty`)
    .custom((value) =>{

        if(value != "Male" || value != "Female" || value != "Other"){

            throw Error(`Gender should be Male or Female or Other`)
        }

        return true
    }),

    async (req, res) =>{

        try {
            
            const errors = valiadationResult(req)

            console.log({errors})

            if(!errors.isEmpty()){

                return res.status(400).send({error: errors.array()})
            }
            
            const user = await User.create(req.body)

            return res.status(201).send(user)

        } catch (error) {
            
            return res.status(500).send({message: error.message})
        }
    }

)

module.exports = router