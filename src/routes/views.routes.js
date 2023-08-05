import { Router } from "express"
import { renderCart, renderMessages, renderProducts } from "../controllers/views.controller.js";
import { checkLogged,checkLogin } from "../middlewares/auth.js";

const router = Router()




router.get("/carts/:cid",renderCart)


// router.get("/realTimeProducts",async(req,res)=>{
//     let products = await productManager.getProducts()
//     res.render("realTimeProducts",{products})
// })


router.get("/realTimeMessages",renderMessages)

router.get("/products",renderProducts);


router.get("/register",(req,res)=>{
    res.render("register")
})
router.get("/login",checkLogged,(req,res)=>{
    res.render("login")
})


router.get("/current",checkLogin, (req, res) => {
  res.render("profile", { user: req.session.user });
});
export default router