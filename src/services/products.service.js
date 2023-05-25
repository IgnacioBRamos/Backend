import { productManager } from "../dao/dbManagers/productsManager.js";


class ProductsService{
    constructor(){}
    
    getProducts(options){
        const products = productManager.paginatedProducts(options)
        return products
    }
    getProductById(productId){
        const product = productManager.findProductById(productId)
        return product
    }
    createProduct(product,filename){
        const newProduct = productManager.createProduct(product,filename)
        return newProduct
    }
    updateProduct(idProduct,changes){
        const updatedProduct = productManager.updateProduct(idProduct,changes)
        return updatedProduct
    }
    deleteProduct(idProduct){
        const productDeleted = productManager.deleteProduct(idProduct)
        return productDeleted
    }
}

export const productService = new ProductsService