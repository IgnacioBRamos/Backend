import mongoose from "mongoose";


const productsCollection = "products"
 
const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    code:{
        type:String,
        unique:true
    },
    category: String,
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    thumbnails: Array,
})

const productModel = mongoose.model(productsCollection,productSchema)
export {productModel}