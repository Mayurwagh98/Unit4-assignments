let GoogleStrategy = require(`passport-google-oauth2`).Strategy

const passort = require(`passport`)

require(`dotenv`).config()

const {v4: uuidv4} = require(`uuid`)

const User = require("../models/user.model")

passport.use(new GoogleStrategy({

    clientId : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) =>{

        let user = await User.findOne({email: profile._json.email})

        if(!user){

            user = await User.create({

                email: profile._json.email,
                password: uuidv4(),
                category: [`seller`]
            })
        }

        return done(error, user)

        console.log({email: profile._json.email})
    }
))

module.exports = passort