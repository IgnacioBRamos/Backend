import { productModel } from "../models/products.models.js";


class Product{
    getProducts = async(options)=>{
        const { query, pagination } = options;
        const paginatedProducts = await productModel.paginate(query, pagination);
        return paginatedProducts;
    }
    findProductById = async(productId)=>{
        const product = await productModel.find({_id:productId})
        if(!product){
            throw "Product Not found"
        }
        return product
    }
    createProduct = async(product,filename)=>{
        const products = await productModel.find()
        const codeExist = products.find((event)=>event.code === product.code)
        if(!product.title || !product.description || !product.price || !product.code || !product.category || !product.stock){
            throw 'Error: all fields are mandatory'
        }
        product.thumbnails = []
        if (!filename) {
            throw "No se pudo cargar el archivo"
          }else{
            filename.forEach(file => {
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

export const productDao = new Product