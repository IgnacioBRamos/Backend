import {Router} from "express"
import { messageManager } from "../dao/mongo/index.js"
const router = Router()




router.get("/",async (req,res)=>{
    const messages = await messageManager.findAll()
    res.send({status:"OK",payload:messages})
})

router.post("/",async (req,res)=>{
    const messageCreated = req.body
    await messageManager.createMessage(messageCreated)
    res.send({status:"OK",payload:"Message Created"})
})




export default router