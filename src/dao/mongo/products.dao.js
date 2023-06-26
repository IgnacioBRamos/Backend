import { productModel } from "../models/products.models.js";
import CustomError from "../../services/errors/customError.js";
import { ErrorMessage,ErrorCause,ErrorName } from "../../services/errors/error.enum.js";
export default class Product{
    getProducts = async(options)=>{
        const { query, pagination } = options;
        const paginatedProducts = await productModel.paginate(query, pagination);
        return paginatedProducts;
    }
    getProductById = async(productId)=>{
        const product = await productModel.findOne({_id:productId}).lean()
        if(!product){ 
            CustomError.generateCustomError({
                name:ErrorName.PRINCIPAL_ERROR_NAME,
                message:ErrorMessage.PRODUCT_ERROR_MESSAGE,
                cause:ErrorCause.PRODUCTS_ERROR_CAUSE
            })
        }
        return product
        
    }
    createProduct = async(product,files)=>{
        const products = await productModel.find()
        const codeExist = products.find((event)=>event.code === product.code)
        if(!product.title || !product.description || !product.price || !product.code || !product.category || !product.stock){
            CustomError.generateCustomError({
                name:ErrorName.PRINCIPAL_ERROR_NAME,
                message:ErrorMessage.AUTHENTICATION_ERROR_MESSAGE,
                cause:ErrorCause.PRODUCTS_ERROR_CAUSE
            })
        }
        
        product.thumbnails = []
        if (files == false) {
            throw "No se pudo cargar el archivo"
        }else{
            files.forEach(file => {
                const imgUrl = `http://localhost:8080/images/${file.filename}`
                product.thumbnails.push(imgUrl)
            });
        }
        if(codeExist){
            throw `Error: the code ${product.code} for the product already exists`
        }

        const createdProduct = await productModel.create(product)
        return createdProduct
    }
    updateProduct = async (idProduct,changes)=>{
        if(changes.id){
            throw "You can not update id"
        }
        const updateProduct= await productModel.updateOne({_id:idProduct},changes)
        return updateProduct
    }
    deleteProduct = async(idProduct)=>{
        const deleteProduct = await productModel.deleteOne({_id:idProduct})
        return deleteProduct
    }
}

