import { productManager } from "../dao/dbManagers/productsManager.js";
import { MessageManager } from "../dao/dbManagers/messagesManager.js";
import { CartManager } from "../dao/dbManagers/cartsManager.js";


const cartManager = new CartManager()
const messageManager = new MessageManager()

export async function renderProducts(req, res){
    const options = {
        query: {},
        pagination: {
          limit: req.query.limit ?? 10,
          page: req.query.page ?? 1,
          lean: true,
          sort: {},
        },
      };
    
      if (req.query.category) {
        options.query.category = req.query.category;
      }
    
      if (req.query.status) {
        options.query.status = req.query.status;
      }
    
      if (req.query.sort) {
        options.pagination.sort.price = req.query.sort;
      }
    
      const {
        docs: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
      } = await productManager.paginatedProducts(options);
    
      const link = "/products/?page=";
    
      const prevLink = hasPrevPage ? link + prevPage : link + page;
      const nextLink = hasNextPage ? link + nextPage : link + page;
    
      return res.render("products", {
        products,
        totalPages,
        page,
        hasNextPage,
        hasPrevPage,
        prevLink,
        nextLink,
        title: "Products",
      });
    }


export async function renderCart(req,res){
    let cartId = req.params.cid
    try{
        let cart = await cartManager.findCartById(cartId)
        console.log(cart.products)
        res.render('cart',{products:cart.products})
        
        
    }catch(error){
        return res
            .status(404)
            .send({status:"Error",message: error})
    }
}
export async function renderMessages(req,res){
    let messages = await messageManager.findAllforTemplate()
    res.render("chat",{messages})
}