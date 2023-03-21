import { Router } from "express"
import { ProductManager } from "../productManager.js";

const router = Router()

const productManager = new ProductManager()



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


router.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts",{})
})


export default router