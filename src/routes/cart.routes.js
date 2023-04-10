import {Router} from "express"
import { CartManager } from "../dao/fileManagers/cartManager.js"



const cartManager = new CartManager()



const router = Router()

router.post("/",async(req,res)=>{
    try{
        await cartManager.addCart()
        return res.status(201).send({status:"Success",message:"Cart created"})
    }catch(error){
        res.status(400).send({ status:"Error", message: error})
    }

})

router.get("/:cid",async(req,res)=>{
    let idCart = Number(req.params.cid)

    try{
        const cart = await cartManager.getCartById(idCart)  
        return res
            .status(200)
            .send({status:"OK",message:cart});
    }catch(error){
        res.status(404).send({ status:"Error", message: error})
    }
})


router.post("/:cid/product/:pid",async(req,res)=>{
    let idCart = Number(req.params.cid)
    let idProduct = Number(req.params.pid)
    let quantity = Number(req.body.quantity)

    try{
        let arrInterno = await cartManager.addProductInsideACart(idCart,idProduct,quantity)
        return res
                .status(200)
                .send({status: `Success`, message: arrInterno});
    }catch(error){
        res.status(404).send({ status:"Error", message: error})
    }

})


export default router
