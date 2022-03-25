const express = require("express")

const router = express.Router()

const Gallery = require("../models/gallery.model")

const upload = require("../midleware/upload")

const fs = require("fs")

router.get("", async (req, res) =>{

    try {
        
        const gallery = await Gallery.findd()
        .populate({path: "user_id"})
        .lean()
        .exec()

        return res.status(200).send(gallery)

    } catch (error) {
        return res.status(500).send({message:err.message})
    }
})

router.post("/:user_id", upload.any("profilePic", 5), async (req, res) =>{

    try {
        
        const filePaths = req.files.map((file) =>{

            return file.path
        })

        const gallery = await Gallery.create({
            profilePic: filePaths,
            user_id: req.params.user_id
        })

        return res.status(200).send(gallery)

    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

router.patch("/:user_id", upload.any("profilePic", 5), async (req, res) =>{

    try{

        const filePaths = req.files.map((file) =>{

            return file.path
        })

        const data = {

            profilePic: filePaths,
            user_id: req.params.user_id
        }

        let gallery = await Gallery.findById(req.params.user_id)

        let file = gallery.profilePic

        for(let i in file){

            fs.unlink(file[i], (error) =>{

                if(error) throw error

                console.log("path/file.txt was deleted")
            })
        }

        gallery = await Gallery.findByIdAndUpdate(req.params.user_id), data, {new: true}

        return res.status(500).send({message: error.message})
    }
    catch (error) {
        return res.status(500).send({mesage:error.message})
})

router.delete("/:id", async (req, res) =>{

    try {
        
        let gallery = await Gallery.findById(req.params.id)

        let images = gallary.profilePic

        console.log(images)

        for(i in images){

            fs.unlink(images[i], (error) =>{

                if(error) throw error

                console.log("path/file.txt was deleted")
            })
        }

        await Gallery.findByIdAndUpdateDelete(req.params.id)

        return res.status(200).send(gallery)

    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

module.exports = router