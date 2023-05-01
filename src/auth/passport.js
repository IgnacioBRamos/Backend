import passport from "passport";
import GitHubStrategy from "passport-github2"
import local from "passport-local"
import userModel from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import config from "../config.js";

const {clientID,clientSecret,callbackUrl} = config
const localStrategy =  local.Strategy

const initializePassport = ()=>{
    passport.use("register",new localStrategy(
        {passReqToCallback:true, usernameField:"email"},async(req,username,password,done)=>{
            const {first_name,last_name,email,age} = req.body
            try{
                let user = await userModel.findOne({email:username})
                if(user){
                    return done(null,false)
                }
                const newUser={
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }
                let result = await userModel.create(newUser)
                return done(null,result)
            }catch(error){
                return done("user can not be found "+user)
            }
        }
    ))
    passport.use("login",new localStrategy({usernameField:"email"},async(username,password,done)=>{
        try{
            const user = await userModel.findOne({email:username}).lean()
            if(!user){
                return done(null, false)
            }
            if(!isValidPassword(user,password)) return done(null,false)
            delete user.password
            return done(null,user)
        }catch(error){
            return done(error)
        }
    }))

    passport.use("githublogin", new GitHubStrategy(
        {clientID,clientSecret,callbackUrl},
        async(accessToken,refreshToken,profile,done)=>{
            try{
                let user= await userModel.findOne({email:profile._json.email})
                if(!user){
                    let newUser= {
                        first_name: profile._json.name,
                        last_name: "",
                        age:18,
                        email: profile._json.email,
                        password:"",
                    }
                    let result = await userModel.create(newUser)
                    return done(null,result)
                }
                return done(null,user)
            }catch(error){
                return done(error)
            }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let user = await userModel.findById(id)
        done(null,user)
    })
}

export default initializePassport