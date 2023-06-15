import {Router} from "express"
import { addProductInsideCart, createCart, deleteProduct, emptyCart, getCartById , updateQuantity } from "../controllers/cart.controller.js"
import { ticketModel } from "../dao/models/ticket.models.js"
// import { authorization } from "../middlewares/auth.js";
const router = Router()


router.post("/",createCart)

router.get("/:cid",getCartById)

router.post("/:cid/purchase",async(req,res)=>{
    try{
        const ticket = req.body
        const crete= await ticketModel.create(ticket)
        res.send({payload:crete})
    }catch(error){
        console.log(error)
    }
})

router.post("/:cid/product/:pid",addProductInsideCart)
router.delete("/:cid/products/:pid",deleteProduct)
router.delete("/:cid",emptyCart)

router.put("/:cid/products/:pid",updateQuantity)




export default router
