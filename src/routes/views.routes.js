import { Router } from "express"
import { renderCart, renderMessages, renderProducts } from "../controllers/views.controller.js";
import { checkLogged,checkLogin } from "../middlewares/auth.js";
import { usersService } from "../services/users.service.js";

const router = Router()




router.get("/carts/:cid",checkLogin,renderCart)


// router.get("/realTimeProducts",async(req,res)=>{
//     let products = await productManager.getProducts()
//     res.render("realTimeProducts",{products})
// })


router.get("/realTimeMessages",renderMessages)

router.get("/products",checkLogin,renderProducts);


router.get("/register",(req,res)=>{
    res.render("register",{title:"Register"})
})
router.get("/login",checkLogged,(req,res)=>{
    res.render("login",{title:"Login"})
})


router.get("/current",checkLogin, async (req, res) => {
  const id = req.user._id
  const user = await usersService.getUserById(id)
  const profile = user.documents?.find(el=>el.reference.endsWith(".jpg")) || ""
  res.render("profile", {
    full_name:user.full_name,
    age: user.age,
    email:user.email,
    documents: profile.reference,
    title:"Profile"
  })
});
export default router