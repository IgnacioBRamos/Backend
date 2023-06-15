import { cartModel } from "../models/carts.models.js"



export default class Cart {
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
        try {
            const cart = await cartModel.findOne({ _id: cartId });
            const parsedQuantity = Number(quantity);
            if (!cart) {
                return { error: `No se encontró el carrito.` };
            }

            const existingProductIndex = cart.products.findIndex(
                (product) => product.product && product.product._id.toString() === productId
            );
              
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += parsedQuantity;
            } else {
                cart.products.push({ product: productId, quantity: parsedQuantity });
            }

            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            return console.log(error);
        }
    }

    updateQuantity= async(cartId,productId,quantity)=>{
        const cart = await cartModel.getCartById(cartId)
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
        const cart = await cartModel.getCartById(cartId)
        cart.products = []
        await cart.save()
        return cart
    }
    deleteProduct=async(productId,cartId)=>{
        const cart = await cartModel.getCartById(cartId)
        const productIndex = cart.products.findIndex(product=>product.id === productId)  
        cart.products.splice(productIndex,1)
        await cart.save()
        return cart
    }
}


