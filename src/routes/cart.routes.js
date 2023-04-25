import {Router} from "express"
import { CartManager } from "../dao/dbManagers/cartsManager.js"
//import { CartManager } from "../dao/fileManagers/cartManager.js"


const cartManager = new CartManager()
const router = Router()


router.post("/",async(req,res)=>{
    const cart= req.body
    try{
        const newCart = await cartManager.addCart(cart)
        return res.status(201).send({status:"Success",message:"Cart created",payload:newCart})
    }catch(error){
        return res.status(400).send({status:"Error",message:error})
    }
})

router.get("/:cid",async(req,res)=>{
        const cartId = req.params.cid
    try{
        const cart = await cartManager.findCartById(cartId)
        return res.status(201).send({status:"Success",message:"Cart Found",payload:cart})
    }catch(error){
        return res.status(400).send({status:"Error",message:error})
    }

})

router.post("/:cid/product/:pid",async(req,res)=>{
    let cartId = req.params.cid
    let productId = req.params.pid
    let {quantity} = req.body
    try{
        arrInterno = await cartManager.addProductInsideCart(cartId,productId,quantity)
        return res
                .status(200)
                .send({status: `Success`, message: arrInterno});
    }catch(error){
        res.status(404).send({ status:"Error", message: error})
    }
})
router.delete("/:cid/products/:pid",async(req,res)=>{
    const {cid} = req.params
    const productId = req.params.pid
    try{
        deletedProduct = await cartManager.deleteProduct(productId,cid)
        return res.status(200).send({status: `Success`, message: deletedProduct});
    }catch(error){
        res.status(404).send({ status:"Error", message: error})
    }
})
router.delete("/:cid",async(req,res)=>{
    const {cid} = req.params
    try{
        deletedCart = await cartManager.emptyCart(cid)
        return res.status(200).send({status: `Success`, message: deletedCart});
    }catch(error){
        res.status(404).send({ status:"Error", message: error})
    }
})
router.put("/:cid",async(req,res)=>{

})
router.put("/:cid/products/:pid",async(req,res)=>{
    const cartId = req.params.cid
    const productId = req.params.pid
    const quantity = req.body.quantity
    console.log(quantity)
    try{
        updatedProduct = await cartManager.updateQuantity(cartId,productId,quantity)
        return res.status(200).send({status: `Success`, payload: updatedProduct});
    }catch(error){
        res.status(404).send({ status:"Error", message: error})
    }
})

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
