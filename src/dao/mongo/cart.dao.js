import { cartModel } from "../models/carts.models.js"
import { productDao } from "./index.js"
import { faker } from "@faker-js/faker";


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
        const cart = await cartModel.findOne({_id:productId}).populate("products.product").lean();
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
                throw "Cart Not Found";
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
            throw error
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


    purchase = async(cartId, currentUser)=>{
        try {
            const cart = await this.getCartById(cartId);
            
            const { products } = cart;
            
            products.forEach(async (order) => {
                console.log (order)
              order.product.stock -= order.quantity;
              await productDao.updateProduct(order.product._id, order.product);
            });
      
            const ammount = products
              .filter((order) => order.product.stock > 0)
              .flatMap((order) => order.product.price * order.quantity)
              .reduce((sum, cur) => (sum += cur), 0);
      
            const ticket = {
              code: faker.string.alphanumeric({ casing: "upper", length: 7 }),
              ammount,
              purchaser: currentUser,
            };
            console.log(ticket)
            const result = await cartModel.create(ticket);
      
            return result;
          } catch (error) {
            console.log(error);
            return null;
          }
        };
    
}


