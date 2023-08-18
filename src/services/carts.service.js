import { cartRepository } from "../repositories/carts.repository.js";

class CartService{
    constructor(){}

    createCart(cart){
        const newCart = cartRepository.createCart(cart)
        return newCart
    }
    getCartById(cartId){
        const cart = cartRepository.getCartById(cartId)
        return cart
    }

    addProductInsideCart=async (cartId,productId,quantity,user)=>{
        try{
            const newProduct = await cartRepository.addProductInsideCart(cartId,productId,quantity,user)
            return newProduct
        }catch(error){
            throw error
        }
    }
    async updateQuantity(cartId,productId,quantity){
        try {
            const updatedProduct = await cartRepository.updateQuantity(cartId,productId,quantity)
            return updatedProduct
        }catch(error){
            throw error
        }
    }
    emptyCart(cartId){
        const cartEmptied = cartRepository.emptyCart(cartId)
        return cartEmptied
    }
    deleteProduct(productId,cid){
        const productDeleted = cartRepository.deleteProduct(productId,cid)
        return productDeleted
    }
    purchase = async (cartId, currentUser) => {
        try {
          const result = await cartRepository.purchase(cartId, currentUser)
          return result
        } catch (error) {
          console.log(error)
          return null
        }
      }
}

export const cartService = new CartService