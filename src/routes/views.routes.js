import { Router } from "express"
import { ProductManager } from "../dao/fileManagers/productManager.js";
import { MessageManager } from "../dao/dbManagers/messagesManager.js";

const router = Router()

const productManager = new ProductManager()

const messageManager = new MessageManager()

router.get("/pruebaproducts",async(req,res)=>{
    try{
        let limit = parseInt(req.query.limit)
        let products = await productManager.getProducts(limit)
        res.render('index',{products})
        
        
    }catch(error){
        return res
            .status(404)
            .send({status:"Error",message: error})
    }
})


router.get("/realTimeProducts",async(req,res)=>{
    let products = await productManager.getProducts()
    res.render("realTimeProducts",{products})
})


router.get("/realTimeMessages",async(req,res)=>{
    let messages = await messageManager.findAll()
    console.log(messages)
    res.render("chat",{messages})
})



export default router