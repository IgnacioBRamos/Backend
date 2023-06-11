import Cart from "./cart.dao.js";
import Product from "./products.dao.js";
import User from "./user.dao.js";
import MessageManager  from "./messagesManager.js";

export const cartDao = new Cart()
export const productDao = new Product()
export const userDao = new User()
export const messageManager = new MessageManager()

