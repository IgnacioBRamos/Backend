import {Router, json} from "express"
import { addProductInsideCart, createCart, deleteProduct, emptyCart, getCartById , purchase, updateQuantity } from "../controllers/cart.controller.js"
import { checkLogin } from "../middlewares/auth.js";


const router = Router()



router.post("/",createCart)
router.get("/:cid",checkLogin,getCartById)
router.post("/:cid/purchase",purchase)
router.post("/:cid/product/:pid",checkLogin,addProductInsideCart)
router.delete("/:cid/products/:pid",checkLogin,deleteProduct)
router.delete("/:cid",checkLogin,emptyCart)

router.put("/:cid/products/:pid",checkLogin,updateQuantity)







export default router
