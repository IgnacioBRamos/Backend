import { productRepository } from "../repositories/index.js"


class ProductsService{
    constructor(){}
    
    getProducts(options){
        try{
            const products = productRepository.getProducts(options)
            return products
        }catch(error){
            throw error
        }
        
    }
    getProductById(productId){
        try{
            const product = productRepository.getProductById(productId)
            return product
        }catch(error){
            throw error
        }
    }
    createProduct(product,files,user){
        try{
            const newProduct = productRepository.createProduct(product,files,user)
            return newProduct
        }catch(error){
            throw error
        }
    }
    updateProduct(idProduct,changes){
        try{
            const updatedProduct = productRepository.updateProduct(idProduct,changes)
            return updatedProduct
        }catch(error){
            throw error
        }
    }
    deleteProduct(idProduct,user){
        try{
            const productDeleted = productRepository.deleteProduct(idProduct,user)
            return productDeleted
        }catch(error){
            throw error
        }
    }
}

export const productService = new ProductsService