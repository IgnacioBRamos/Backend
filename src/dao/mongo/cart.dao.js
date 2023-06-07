import { cartModel } from "../models/carts.models.js"



class Cart {
    constructor(){}

    createCart = async(cart) =>{
        if(!cart){
            throw "Product not added"
        }
        const newCart = await cartModel.create(cart)
        return newCart
    }

    getCart = async () =>{
        const carts = await cartModel.find()
        return carts
    }
    
    getCartById= async(productId) =>{
        const cart = await cartModel.find({_id:productId}).populate("products.product").lean();
        if(!cart){
            throw "Cart not Found"
        }else{
            return cart
        }
    }
    addProductInsideCart=async(cartId,productId,quantity)=>{

        const productExist = await cartModel.findOne({
            products: { $elemMatch: { product: productId } },
          })

        if (!productExist){
            const cartActualizado = await cartModel.updateOne({_id:cartId},{ $push: { products: [{ product: productId, quantity }] }} )
            if(!cartActualizado){
                throw "Product not found"
            }   
            return cartActualizado
        }
        const cartActualizado = await cartModel.updateOne(
            { _id: cartId },
            { $inc: { "products.$[elem].quantity": quantity } },
            { arrayFilters: [{ "elem.product": productId }] }
          );
          return cartActualizado
    }

    updateQuantity= async(cartId,productId,quantity)=>{
        const cart = await cartModel.findById(cartId)
        if (!cart) {
            throw "cart not found"
        }
        const product = cart.products.find((product) => product.id === productId)
        if (!product) {
            throw "Product not found"
        }
        product.quantity = quantity
        await cart.save()
        return cart
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
}


export const cartDao = new Cart