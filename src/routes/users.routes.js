import { Router } from "express";
import { userDao } from "../dao/mongo/index.js";


const router = Router()



router.put("/premium/:uid",async(req,res)=>{
    const {uid} = req.params
    const user = await userDao.changeUserRole(uid)
    res.send(user)
})
router.get("/",async(req,res)=>{
    const usersFound = await userDao.getUsers()
    res.send(usersFound)
})



export default router