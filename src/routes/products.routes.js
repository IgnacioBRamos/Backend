import {Router} from "express"

import { generateProduct, uploader } from "../utils.js";

import { getProducts,findProductById,createProduct,deleteProduct, updateProduct} from "../controllers/products.controller.js";
import { authorization, checkLogin } from "../middlewares/auth.js";

const router = Router()




router.get("/",checkLogin,getProducts);
router.get("/:pid",findProductById)

router.post("/",checkLogin,authorization(["admin","premium"]),uploader.array("thumbnails",5),createProduct)

router.put("/:pid",checkLogin,authorization(["admin","premium"]),updateProduct)

router.delete("/:pid",checkLogin,authorization(["admin","premium"]),deleteProduct)




let products = []
router.post("/mockingproducts",(req,res)=>{
    for(let i = 0; i<100; i++){
        products.push(generateProduct())
    }
    res.send({status:"success",payload:products})
})


export default router