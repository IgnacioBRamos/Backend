import {productDao} from "../dao/mongo/index.js"



export default class ProductRepository{
    constructor(dao){this.dao=dao}
    getProducts = async (options) => {
        try {
          const products = await this.dao.getProducts(options);
          return products;
        } catch (error) {
          console.log(error);
          return null;
        }
    }
    getProductById = async (id) => {
    try {
        const product = await productDao.getProductById(id);
        return product;
    } catch (error) {
        console.log(error);
        return null;
    }
    }
    createProduct = async (product,filename) => {
    try {
        const result = await productDao.createProduct(product,filename);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
    }
    updateProduct = async (id, changes) => {
    try {
        const result = await productDao.updateProduct(id, changes);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
    }
    deleteProduct = async (id) => {
    try {
        const result = await productDao.deleteProduct(id);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
    }
}


