import mongoose from "mongoose";


const cartsCollection = "carts"
 
const cartSchema = new mongoose.Schema({
    product:[ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"products"
        }
    ],
})

const cartModel = mongoose.model(cartsCollection,cartSchema)
export {cartModel}