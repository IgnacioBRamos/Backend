import ProductRepository from "./products.repository.js";
import { contacts } from "../dao/factory.js";
import UsersRepository from "./users.repository.js";


export const productRepository = new ProductRepository(contacts)
export const usersRepository = new UsersRepository()