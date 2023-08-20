import { productDao } from "../dao/mongo/index.js";
import { messageManager } from "../dao/mongo/index.js"
import { cartDao } from "../dao/mongo/index.js";



export async function renderProducts(req, res){
    const cart = req.user.cart
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
      } = await productDao.getProducts(options);
      let limit = options.pagination.limit
      const link = `/products/?limit=${limit}&page=`;
    
      const prevLink = hasPrevPage ? link + prevPage : link + page;
      const nextLink = hasNextPage ? link + nextPage : link + page;
    
      return res.render("products", {
        cart,
        products,
        totalPages,
        page,
        hasNextPage,
        hasPrevPage,
        prevLink,
        nextLink,
        title: "Products",
        cartId: cart._id
      });
}


export async function renderCart(req,res){
    let cartId = req.user.cart
    try{
        let cart = await cartDao.getCartById(cartId)
        res.render('cart',{
          products:cart.products,
          cartId: req.user.cart._id,
          title:"Cart"
        })
        
    }catch(error){
        return res.status(404).send({status:"Error",message: error})
    }
}
export async function renderMessages(req,res){
    let messages = await messageManager.findAllforTemplate()
    res.render("chat",{messages})
}