import {Router} from "express"
import passport from "passport"
import { login,logout } from "../controllers/sessions.controller.js"
const router = Router()

router.post("/login",passport.authenticate("login",{failureRedirect:"/failLogin"}),login)
router.get("/failLogin",(req,res)=>{res.send({error:"Failed login"})})

router.post("/register",passport.authenticate("register",{failureRedirect:"/failregister"}),async (req,res)=>{
    return res.send({status:"success",message:"User registered"})
})
router.get("/failregister",(req,res)=>{
    return res.send({status:"error",error:"Authentication error"})
})


router.get("/logout",logout)



router.get("/github",passport.authenticate("githublogin",{scope:["user:email"]}),(req,res)=>{})

router.get("/githubcallback",passport.authenticate("githublogin",{failureRedirect:"/login"}),(req,res)=>{
    req.session.user=req.user
    res.redirect("/products")
})



export default router