import { cartRepository } from "../repositories/carts.repository.js";

class CartService{
    constructor(){}

    createCart(cart){
        const newCart = cartRepository.createCart(cart)
        return cart
    }
    getCart(id){
        const cart = cartRepository.getCart(id)
        return cart
    }

    addProduct(cartId,productId,quantity){
        const newProduct = cartRepository.addProduct(cartId,productId,quantity)
        return newProduct
    }
    updateQuantity(cartId,productId,quantity){
        const updatedProduct = cartRepository.updateQuantity(cartId,productId,quantity)
        return updatedProduct
    }
    emptyCart(cartId){
        const cartEmptied = cartRepository.emptyCart(cartId)
        return cartEmptied
    }
    deleteProduct(productId,cid){
        const productDeleted = cartRepository.deleteProduct(productId,cid)
        return productDeleted
    }
}

export const cartService = new CartService