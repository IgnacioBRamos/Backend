import { cartModel } from "../models/carts.models.js"



export class CartManager{
    findCart = async () =>{
        const carts = await cartModel.find()
        return carts
    }
    addCart = async(cart) =>{
        const newCart = await cartModel.create(cart)
    }
    findCartById= async(productId) =>{
        const cart = await cartModel.find({_id:productId})
        if(!cart){
            throw "Cart not Found"
        }else{
            return cart
        }
    }
    addProductInsideCart=async(cartId,productFound)=>{
        //const cart = await this.findCartById(cartId)
        
        const cartActualizado = await cartModel.updateOne({_id:cartId},{$addToSet:{product:[productFound]}} )
        console.log(cartActualizado)
        return cartActualizado
    }
}