import { cartDao } from "../dao/mongo/index.js"

class CartRepository {
    constructor(){}

    createCart(cart){
        try{
            const newCart = cartDao.createCart(cart)
            return newCart
        }catch(error){
            return error
        }

    }
    getCartById(cartId){
        try{
            const cart = cartDao.getCartById(cartId)
            return cart
        }catch(error){
            return error
        }

    }

    addProductInsideCart = async(cartId,productId,quantity)=>{
        const newProduct = await cartDao.addProductInsideCart(cartId,productId,quantity)
        return newProduct
    }
    async updateQuantity(cartId,productId,quantity){
        try{
            const updatedProduct = await cartDao.updateQuantity(cartId,productId,quantity)
            return updatedProduct
        }catch(error){
            throw error
        }
    }
    async emptyCart(cartId){
        const cartEmptied = await cartDao.emptyCart(cartId)
        return cartEmptied
    }
    async deleteProduct(productId,cid){
        const productDeleted = await cartDao.deleteProduct(productId,cid)
        return productDeleted
    }
    purchase = async (cartId, currentUser) => {
        try {
          const result = await cartDao.purchase(cartId, currentUser)
          return result
        } catch (error) {
          return error
        }
      }
}

export const cartRepository = new CartRepository