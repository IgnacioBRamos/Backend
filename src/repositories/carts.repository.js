import { cartDao } from "../dao/mongo/index.js"

class CartRepository {
    constructor(){}

    createCart(cart){
        const newCart = cartDao.createCart(cart)
        return newCart
    }
    getCartById(id){
        const cart = cartDao.getCartById(id)
        return cart
    }

    addProductInsideCart = async(cartId,productId,quantity)=>{
        const newProduct = await cartDao.addProductInsideCart(cartId,productId,quantity)
        return newProduct
    }
    updateQuantity(cartId,productId,quantity){
        const updatedProduct = cartDao.updateQuantity(cartId,productId,quantity)
        return updatedProduct
    }
    emptyCart(cartId){
        const cartEmptied = cartDao.emptyCart(cartId)
        return cartEmptied
    }
    deleteProduct(productId,cid){
        const productDeleted = cartDao.deleteProduct(productId,cid)
        return productDeleted
    }
    purchase = async (cartId, currentUser) => {
        try {
          const result = await cartDao.purchase(cartId, currentUser)
          return result
        } catch (error) {
          console.log(error)
          return null
        }
      }
}

export const cartRepository = new CartRepository