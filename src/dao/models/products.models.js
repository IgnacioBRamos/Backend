import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "products"
 
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        index:true
    },
    description:String,
    price:Number,
    code:{
        type:String,
        unique:true,
        index:true
    },
    category: String,
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    thumbnails: Array,
    owner: {
        type: String,
        default: "admin"
    }
})
productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productsCollection,productSchema)
export {productModel}