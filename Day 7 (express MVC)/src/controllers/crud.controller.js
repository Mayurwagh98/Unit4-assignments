const post = (model) => async (req, res) =>{

    try{

        const item = await model.create(req.body)

        return res.status(201).send(req.body)
    }
    catch(error){
        return res.status(500).send({message : error.message})
    }
}

module.exports = {post: post}