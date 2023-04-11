import mongoose from "mongoose";


const cartsCollection = "carts"
 
const cartSchema = new mongoose.Schema({
    product:{
        type:Array,
        default: []
    }
})

const cartModel = mongoose.model(cartsCollection,cartSchema)
export {cartModel}