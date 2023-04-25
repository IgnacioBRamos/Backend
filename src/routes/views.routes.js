import { Router } from "express"
import { ProductManager } from "../dao/dbManagers/productsManager.js";
import { MessageManager } from "../dao/dbManagers/messagesManager.js";
import { CartManager } from "../dao/dbManagers/cartsManager.js";
import { productModel } from "../dao/models/products.models.js";

const router = Router()

const productManager = new ProductManager()
const cartManager = new CartManager()
const messageManager = new MessageManager()

// router.get("/products",async(req,res)=>{
//     try{
//         let limit = parseInt(req.query.limit)
//         let products = await productManager.findAll(2,2)
//         res.render('index',{products})
        
        
//     }catch(error){
//         return res
//             .status(404)
//             .send({status:"Error",message: error})
//     }
// })
router.get("/carts/:cid",async(req,res)=>{
    try{
        let cartId = parseInt(req.params.cid)
        let cart = await cartManager.findCartById(cartId)
        res.render('cart',{cart})
        
        
    }catch(error){
        return res
            .status(404)
            .send({status:"Error",message: error})
    }
})


// router.get("/realTimeProducts",async(req,res)=>{
//     let products = await productManager.getProducts()
//     res.render("realTimeProducts",{products})
// })


router.get("/realTimeMessages",async(req,res)=>{
    let messages = await messageManager.findAllforTemplate()
    res.render("chat",{messages})
})

router.get("/puca", async (req, res) => {
    
})

export default router