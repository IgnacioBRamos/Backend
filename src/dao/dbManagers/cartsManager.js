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
    addProductInsideCart=async(cartId,productId,quantity)=>{
        
            const carts = await this.findCart()
            const cart = await this.findCartById(cartId)
            cart.product = []
            const internalArr = cart.product
            
            const cartIndex =  carts.findIndex(el => el._id == cartId)
            const productInsideCart = internalArr.find(el=> el.id == productId)
            const productIndex = internalArr.findIndex(el => el.id == productId)
    


            if(!productInsideCart){
                const updateCart={
                    id:productId,
                    quantity:1
                }
                internalArr.push(updateCart)
            }else{

                if(quantity){
                    const updateCart={
                        ...productInsideCart,
                        quantity: (productInsideCart.quantity)+quantity,
                    }
                    internalArr.splice(productIndex,1,updateCart)
                }else{
                    const updateCart={
                        ...productInsideCart,
                        quantity: (productInsideCart.quantity)+1,
                    }
                    internalArr.splice(productIndex,1,updateCart)
                }
            }
            carts.splice(cartIndex,1,cart)
            return carts
    }
}