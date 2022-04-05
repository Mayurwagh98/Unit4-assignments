const express = require("express")

const router = express.Router()

const client = require(`../models/products.model`)

const Product = require(`../models/products.model`)

router.get("", async (req, res) =>{

    try {
        
        //getting products from db
        const products = await Product.find().lean().exec()
    }
    catch (err){

        return res.send(500).send(error)
    }
})

router.post("", async (req, res) =>{

    try {
        
        const product = await Product.create(req.body)

        //gettting updated product list form backend to add to redis
        const products = await Product.find().lean().exec()

        //setting key value pair in redis
        client.set("products", JSON.stringify(products))

        return res.status(201).send(product)

    } catch (error) {
        
        return res.status(500).send(error)
    }
})