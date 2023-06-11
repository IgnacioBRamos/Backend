import { productRepository } from "../repositories/index.js"


class ProductsService{
    constructor(){}
    
    getProducts(options){
        const products = productRepository.getProducts(options)
        return products
    }
    getProductById(productId){
        const product = productRepository.getProductById(productId)
        return product
    }
    createProduct(product,filename){
        const newProduct = productRepository.createProduct(product,filename)
        return newProduct
    }
    updateProduct(idProduct,changes){
        const updatedProduct = productRepository.updateProduct(idProduct,changes)
        return updatedProduct
    }
    deleteProduct(idProduct){
        const productDeleted = productRepository.deleteProduct(idProduct)
        return productDeleted
    }
}

export const productService = new ProductsService