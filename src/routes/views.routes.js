import { Router } from "express"
import { ProductManager } from "../dao/dbManagers/productsManager.js";
import { MessageManager } from "../dao/dbManagers/messagesManager.js";
import { CartManager } from "../dao/dbManagers/cartsManager.js";
import { productModel } from "../dao/models/products.models.js";

const router = Router()

const productManager = new ProductManager()
const cartManager = new CartManager()
const messageManager = new MessageManager()



function checkLogin(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

function checkLogged(req, res, next) {
  if (req.session.user) return res.redirect("/products");
  next();
}





// router.get("/products",async(req,res)=>{
//     try{
//         let limit = parseInt(req.query.limit)
//         let products = await productManager.findAll(2,2)
//         res.render('index',{products})
        
        
//     }catch(error){
//         return res
//             .status(404)
//             .send({status:"Error",message: error})
//     }
// })
router.get("/carts/:cid",async(req,res)=>{
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
})


// router.get("/realTimeProducts",async(req,res)=>{
//     let products = await productManager.getProducts()
//     res.render("realTimeProducts",{products})
// })


router.get("/realTimeMessages",async(req,res)=>{
    let messages = await messageManager.findAllforTemplate()
    res.render("chat",{messages})
})

router.get("/products", async (req, res) => {
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
    });


router.get("/register",(req,res)=>{
    res.render("register")
})
router.get("/login",checkLogged,(req,res)=>{
    res.render("login")
})
export default router