import { Router } from "express";
import { uploader2 } from "../utils.js";
import { changeUserRole, getUsers, uploadDocuments } from "../controllers/users.controller.js";
import { authorization, checkLogin } from "../middlewares/auth.js";
import { userDao } from "../dao/mongo/index.js";
const router = Router()


router.get("/",checkLogin,authorization(["admin"]),getUsers)

router.put("/premium/:uid",checkLogin,authorization(["admin"]),changeUserRole)

router.post("/:uid/documents",checkLogin,uploader2.single("reference"),uploadDocuments)


router.get("/delete",async(req,res)=>{
    try{
        const messageUser = await userDao.deleteUser()
        return res.status(200).send({status:"OK",message:messageUser})
    }catch(error){
        return res.status(400).send({status:"Error",message:error})
    }
})

export default router