import {Router} from "express"
import { addProductInsideCart, createCart, deleteProduct, emptyCart, getCartById , purchase, updateQuantity } from "../controllers/cart.controller.js"

// import { authorization } from "../middlewares/auth.js";
const router = Router()


router.post("/",createCart)

router.get("/:cid",getCartById)

router.post("/:cid/purchase",purchase)

router.post("/:cid/product/:pid",addProductInsideCart)
router.delete("/:cid/products/:pid",deleteProduct)
router.delete("/:cid",emptyCart)

router.put("/:cid/products/:pid",updateQuantity)




export default router
