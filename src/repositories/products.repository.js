import {productDao} from "../dao/mongo/index.js"



export default class ProductRepository{
    constructor(dao){this.dao=dao}
    getProducts = async (options) => {
        try {
          const products = await this.dao.getProducts(options);
          return products;
        } catch (error) {
          throw error
        }
    }
    getProductById = async (id) => {
        try {
            const product = await productDao.getProductById(id);
            return product;
        } catch (error) {
            throw error
        }
    }
    createProduct = async (product,files,user) => {
        try {
            const result = await productDao.createProduct(product,files,user);
            return result;
        } catch (error) {
            throw error
        }
    }
    updateProduct = async (id, changes) => {
        try {
            const result = await productDao.updateProduct(id, changes);
            return result;
        } catch (error) {
            throw error
        }
    }
    deleteProduct = async (id,user) => {
        try {
            const result = await productDao.deleteProduct(id,user);
            return result;
        } catch (error) {
            throw error
        }
    }
}


