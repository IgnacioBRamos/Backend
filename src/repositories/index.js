import ProductRepository from "./products.repository.js";
import { contacts } from "../dao/factory.js";


export const productRepository = new ProductRepository(contacts)
