import {Router} from "express"
import { addProduct, createCart, deleteProduct, emptyCart, findCart, updateQuantity } from "../controllers/cart.controller.js"
//import { CartManager } from "../dao/fileManagers/cartManager.js"



const router = Router()


router.post("/",createCart)

router.get("/:cid",findCart)

router.post("/:cid/product/:pid",addProduct)
router.delete("/:cid/products/:pid",deleteProduct)
router.delete("/:cid",emptyCart)

router.put("/:cid/products/:pid",updateQuantity)

// File system

// router.post("/",async(req,res)=>{
//     try{
//         await cartManager.addCart()
//         return res.status(201).send({status:"Success",message:"Cart created"})
//     }catch(error){
//         res.status(400).send({ status:"Error", message: error})
//     }

// })

// router.get("/:cid",async(req,res)=>{
//     let idCart = Number(req.params.cid)

//     try{
//         const cart = await cartManager.getCartById(idCart)  
//         return res
//             .status(200)
//             .send({status:"OK",message:cart});
//     }catch(error){
//         res.status(404).send({ status:"Error", message: error})
//     }
// })


// router.post("/:cid/product/:pid",async(req,res)=>{
//     let idCart = Number(req.params.cid)
//     let idProduct = Number(req.params.pid)
//     let quantity = Number(req.body.quantity)

//     try{
//         let arrInterno = await cartManager.addProductInsideACart(idCart,idProduct,quantity)
//         return res
//                 .status(200)
//                 .send({status: `Success`, message: arrInterno});
//     }catch(error){
//         res.status(404).send({ status:"Error", message: error})
//     }

// })


export default router
