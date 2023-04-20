import { cartModel } from "../models/carts.models.js"



export class CartManager{
    findCart = async () =>{
        const carts = await cartModel.find()
        return carts
    }
    addCart = async(cart) =>{
        if(!cart){
            throw "Product not added"
        }
        const newCart = await cartModel.create(cart)
        return newCart
    }
    findCartById= async(productId) =>{
        const cart = await cartModel.find({_id:productId}).populate("products.product");
        if(!cart){
            throw "Cart not Found"
        }else{
            return cart
        }
    }
    addProductInsideCart=async(cartId,productId,quantity)=>{
        const cartActualizado = await cartModel.updateOne({_id:cartId},{ $push: { products: [{ product: productId, quantity }] }} )
        if(!cartActualizado){
            throw "Product not found"
        }
        return cartActualizado
    }
}