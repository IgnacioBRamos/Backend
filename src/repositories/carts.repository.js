import { cartManager } from "../dao/dbManagers/cartsManager.js";

class CartRepository {
    constructor(){}


    createCart(cart){
        const newCart = cartManager.addCart(cart)
        return newCart
    }

    getCart(id){
        const cart = cartManager.findCartById(id)
        return cart
    }

    addProduct(cartId,productId,quantity){
        const newProduct = cartManager.addProductInsideCart(cartId,productId,quantity)
        return newProduct
    }
    updateQuantity(cartId,productId,quantity){
        const updatedProduct = cartManager.updateQuantity(cartId,productId,quantity)
        return updatedProduct
    }
    emptyCart(cartId){
        const cartEmptied = cartManager.emptyCart(cartId)
        return cartEmptied
    }
    deleteProduct(productId,cid){
        const productDeleted = cartManager.deleteProduct(productId,cid)
        return productDeleted
    }

}

export const cartRepository = new CartRepository