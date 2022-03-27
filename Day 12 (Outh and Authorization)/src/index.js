const express = require("express")
const connect = require("./configs/db")
const passport = require("./configs/google-auth")
const userController = require("./controller/user.controller")
const productController = require("./controller/product.controller")
const {register, login, generateToken} =require("./controller/auth.controller")
const app = express()

app.use(express.json())

app.use("/users", userController)

app.post("/register", register)

app.post("/login", login)

app.use("/products", productController)

app.get("/auth/google", passport.authetication("google",{
    scope: ["email", "profile"]}
))

app.get("auth/google/callback", passport.authetication("google",{

    successRedirect : "/auth/google/success",

    failureRedirect: "/auth/google/failure"
}))

app.listen(4000, async (req, res) =>{

    try {
        
        await connect()

        console.log("listening")

    } catch (error) {
        
        console.log(error.message)
    }
})