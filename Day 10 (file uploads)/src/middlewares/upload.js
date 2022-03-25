const path = require("path")

const multer = require("multer")

const storage = multer.diskStorage({

    destination: function (req, file, callback){

        console.log(__dirname)

        callback(null, path.join(__dirname, "../my_uploads"))
    },

    filename: function (req, file, callback){

        const uniquePrefix = Date.now()

        callback(null, uniquePrefix + "-" + file.originalname)
    }
})

const fileFilter = (req, file, callack) => {

    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){

        callack(null, true)
    }
    else{

        callack(new Error ("Incorrect mime type"), false)
    }
}

const options = {

    storage, fileFilter,
    limit: {
        
        fileSize: 1024 * 1024 * 5
    }
}

const uploads = multer(options)

module.exports = uploads