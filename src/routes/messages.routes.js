import {Router} from "express"
import { MessageManager } from "../dao/dbManagers/messagesManager.js"
const router = Router()


const messageManager = new MessageManager()

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