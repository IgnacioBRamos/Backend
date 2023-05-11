import {Router} from "express"
import userModel from "../dao/models/users.model.js"
import passport from "passport"

const router = Router()

router.post("/login",passport.authenticate("login",{failureRedirect:"/failLogin"}),async(req,res)=>{
    if(!req.user) return res.status(400).send({status:"error",error:"Invalid Credentials"})
    req.session.user={
        firts_name: req.user.firts_name,
        last_name: req.user.last_name,
        age:req.user.age,
        email:req.user.email
    }
    
    res.send({status:"Success",payload:req.user})
})
router.get("/failLogin",(req,res)=>{
    res.send({error:"Failed login"})
})

router.post("/register",passport.authenticate("register",{failureRedirect:"/failregister"}),async (req,res)=>{
    return res.send({status:"success",message:"User registered"})
})
router.get("/failregister",(req,res)=>{
    return res.send({status:"error",error:"Authentication error"})
})


router.get("/logout",(req,res)=>{
    req.session.destroy(err => {
        if (err) {
          console.error(err);
        } else {
          res.redirect('/login');
        }
      });
})



router.get("/github",passport.authenticate("githublogin",{scope:["user:email"]}),(req,res)=>{})

router.get("/githubcallback",passport.authenticate("githublogin",{failureRedirect:"/login"}),(req,res)=>{
    req.session.user=req.user
    res.redirect("/products")
})

export default router