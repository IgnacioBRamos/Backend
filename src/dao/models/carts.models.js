import mongoose from "mongoose";


const cartsCollection = "carts"
 
const cartSchema = mongoose.Schema({
    products:[
        {
            product:{
                type:mongoose.Types.ObjectId,
                ref:"products",
            },
            quantity:{
                type: Number,
                default:1,
            }
        },
    ]
})

const cartModel = mongoose.model(cartsCollection,cartSchema)
export {cartModel}