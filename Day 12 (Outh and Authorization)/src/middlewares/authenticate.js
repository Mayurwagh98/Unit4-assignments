require("dotenv").config()

const jwt = require("jsonwentoken")

const verifyToken = (token) =>{

    return new Promise ((resolve, reject) =>{

        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) =>{

            if(error) {
                return reject(error)
            }

            return resolve(decoded)
        })
    })
}

const authenticate = async (req, res, next) =>{

    if(!req.headers.authorization){

        return res.status(400).send({message : "Authorization token not found"})
    }

    if(!req.headers.authorization.startsWith("Bearer")){

        return res.status(400).send({message : "Authorization token not found "})
    }

    const token = req.headers.authorization.trim().split(" ")[1]

    let decoded
    try {
        
        decoded = await verifyToken(token)

    } catch (error) {
        
        console.log(error)

        return res.status(400).send({message : "Authorization token not found"})
    }

    req.userId = decode.user_id

    return next()
}

module.exports = authenticate