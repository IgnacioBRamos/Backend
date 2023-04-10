import mongoose from "mongoose";


const cartsCollection = "carts"
 
const cartSchema = new mongoose.Schema({
    product:Array
})

const cartModel = mongoose.model(cartsCollection,cartSchema)
export {cartModel}