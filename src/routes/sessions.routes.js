import {Router} from "express"
import userModel from "../dao/models/users.model.js"

const router = Router()

router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body
        const user=await userModel.findOne({email,password})
        if(!user){
            return res.status(400).send({status:"error",error:"incorrect credentials"})
        }
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }
        return res.send({status:"success",message:"Logged in",payload:req.session.user})  
    }catch(error){
        console.log(error)
    }
})

router.post("/register",async (req,res)=>{
    try{
        const {first_name,last_name,email,age,password}=req.body
        const userExist=await userModel.findOne({email})
        if(userExist){
            return res.status(400).send({status:"error",error:"user already exist"})

        }
        const user={
            first_name,
            last_name,
            email,
            age,
            password
        }
        await userModel.create(user)
        return res.send({status:"success",message:"User registered"})
    }catch(error){
        console.log(error)
    }
})


export default router