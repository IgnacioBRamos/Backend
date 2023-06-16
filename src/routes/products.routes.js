import {Router} from "express"

import { generateProduct, uploader } from "../utils.js";

import { getProducts,findProductById,createProduct,deleteProduct, updateProduct} from "../controllers/products.controller.js";
import { authorization } from "../middlewares/auth.js";

const router = Router()




router.get("/",getProducts);
router.get("/:pid",findProductById)

router.post("/",uploader.array("thumbnails",5),createProduct)

router.put("/:pid",updateProduct)

router.delete("/:pid",deleteProduct)




let products = []
router.post("/mockingproducts",(req,res)=>{
    for(let i = 0; i<100; i++){
        products.push(generateProduct())
    }
    res.send({status:"success",payload:products})
})


export default router