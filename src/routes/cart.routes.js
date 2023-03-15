import {Router} from "express"
import fs from "fs"
import { ProductManager } from "../productManager.js"
import { CartManager } from "../cartManager.js"



const cartManager = new CartManager()

const path = cartManager.path

let carts = await cartManager.getCart()

const router = Router()

router.post("/",async(req,res)=>{
    const cart ={
        product:[]
    }
    carts.length === 0 
    ? (cart.id = 1)
    : (cart.id = carts[carts.length-1].id+1)

    carts.push(cart)

    await fs.promises.writeFile(path,JSON.stringify(carts,null,"\t"))
    return res.status(201).send({status:"Success",message:"User created"})

})

router.get("/:cid",async(req,res)=>{
    let idCart = Number(req.params.cid)
    const cart = await cartManager.getCartById(idCart)
    if(!cart) return res.status(400).send({status:"Error",message:"No se encontro carrito"})
    return res
        .status(200)
        .send({status:"OK",message:cart});
})


router.post("/:cid/product/:pid",async(req,res)=>{
    let idCart = Number(req.params.cid)
    let idProduct = Number(req.params.pid)

    const cart = await cartManager.getCartById(idCart)
    const arrInterno = cart.product

    const cartIndex = carts.findIndex(el=>el.id === idCart)
    const idProductiInsideCart= arrInterno.find(el=>el.id === idProduct)

    const indexCart = arrInterno.findIndex(u=>u.id === idProduct)




    if(!cart) return res.status(404).send({status: `Error`, error: `No se encontró el carrito.`});

    if(!idProductiInsideCart){
        const updateCart={
            id:idProduct,
            quantity:1
        }
        arrInterno.push(updateCart)
    }else{
        const updateCart={
            ...idProductiInsideCart,
            quantity: (idProductiInsideCart.quantity)+1,
        }
        arrInterno.splice(indexCart,1,updateCart)
    }
    
    carts.splice(cartIndex,1,cart)

    await fs.promises.writeFile(path,JSON.stringify(carts,null,"\t"))

    
    return res
            .status(200)
            .send({status: `Success`, message: arrInterno});

})


export default router
