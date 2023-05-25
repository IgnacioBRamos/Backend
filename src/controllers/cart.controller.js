import { CartManager } from "../dao/dbManagers/cartsManager.js"

const cartManager = new CartManager()

export async function createCart(req,res){
    const cart= req.body
    try{
        const newCart = await cartManager.addCart(cart)
        return res.status(201).send({status:"Success",message:"Cart created",payload:newCart})
    }catch(error){
        return res.status(400).send({status:"Error",message:error})
    }
}

export async function addProduct(req,res){
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
}

export async function findCart(req,res){
    const cartId = req.params.cid
try{
    const cart = await cartManager.findCartById(cartId)
    return res.status(201).send({status:"Success",message:"Cart Found",payload:cart})
}catch(error){
    return res.status(400).send({status:"Error",message:error})
}

}



export async function deleteProduct(req,res){
    const {cid} = req.params
    const productId = req.params.pid
    try{
        deletedProduct = await cartManager.deleteProduct(productId,cid)
        return res.status(200).send({status: `Success`, message: deletedProduct});
    }catch(error){
        res.status(404).send({ status:"Error", message: error})
    }
}

export async function emptyCart(req,res){
    const {cid} = req.params
    try{
        deletedCart = await cartManager.emptyCart(cid)
        return res.status(200).send({status: `Success`, message: deletedCart});
    }catch(error){
        res.status(404).send({ status:"Error", message: error})
    }
}

export async function updateQuantity(req,res){
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
}