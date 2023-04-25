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
        console.log(cartActualizado)
        return cartActualizado
    }
    emptyCart=async(cartId)=>{
        const cart = await cartModel.findById(cartId)
        cart.products = []
        await cart.save()
        return cart
    }
    deleteProduct=async(productId,cartId)=>{
        const cart = await cartModel.findById(cartId)
        const productIndex = cart.products.findIndex(product=>product.id === productId)  
        cart.products.splice(productIndex,1)
        await cart.save()
        return cart
    }

    updateQuantity= async(cartId,productId,quantity)=>{
        const cart = await cartModel.findById(cartId)
        if (!cart) {
            throw "cart not found"
        }
        //console.log(cart.products)
        const product = cart.products.find((product) => product.id === productId)
        console.log(product)
        if (!product) {
            throw "Product not found"
        }
        product.quantity = quantity
        await cart.save()
        return cart
    }
}