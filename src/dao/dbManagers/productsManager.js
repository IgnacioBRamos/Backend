import { productModel } from "../models/products.models.js"



export class ProductManager{
    findAll = async (limit,page,sort)=>{
        if(limit){
            await productModel.paginate({},{limit:limit,page:page})
        }
        const products = await productModel.find().lean()
        return products
    }
    findProductById = async(productId)=>{
        const product = await productModel.find({_id:productId})
        if(!product){
            throw "Product Not found"
        }
        return product
    }
    createProduct = async(product,filename)=>{
        const products = await this.findAll()
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
    }
    deleteProduct = async(idProduct)=>{
        const deleteProduct = await productModel.deleteOne({_id:idProduct})
    }

}