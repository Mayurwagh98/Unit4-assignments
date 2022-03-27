const Product = require("../models/product.model")

const authorise = async(req, res, next) =>{

    try {
        
        let product = await Product.findById(req.params.productId)

        if(req.userId == product.user_id.toString()){
            //check user is logged in and product seller are same
            return next()
        }

        return res.status(401).send({message : "You are not allowed"});

    } catch (error) {
        return res.status(500).send(err)
        
    }
}

module.exports = authorise