import {Router} from "express"
import { ProductManager } from "../productManager.js";
import { uploader } from "../utils.js";


const router = Router()

const productManager = new ProductManager()


router.get("/",async(req,res)=>{
    try{
        let limit = parseInt(req.query.limit)
        let products = await productManager.getProducts(limit)
        return res.status(200).send({status:"OK",message:products})
        
    }catch(error){
        return res
            .status(404)
            .send({status:"Error",message: error})
    }

})

router.get("/:pid",async(req,res)=>{

    let idProduct = parseInt(req.params.pid)
    try{
        const product = await productManager.getProductsById(idProduct)
        res.status(200).send({status:"OK",message:product})
    }catch (error) {
        res.status(404).send({ status:"Error",message: error })
    }
})
router.post("/", uploader.array("thumbnails",5),async(req,res)=>{    
    const filename = req.files;
    let product = req.body
    try{
        await productManager.addProduct(product,filename)
        return res.status(201).send({status:"Success",message:"Product created"})
    }catch(error){
        res.status(400).send({ status:"Error",message: error })
    }
})

router.put("/:id",async(req,res)=>{

    let productId = Number(req.params.id)
    let changes = req.body

    try{
        await productManager.updateProduct(productId,changes)
        return res.status(200).send({status:"OK",message:"Product succesfully updated"})
    }catch(error){
        res.status(404).send({ status:"Error",message: error })
    }
})

router.delete("/:id",async(req,res)=>{
    const productId = Number(req.params.id)
    
    try{
        await productManager.deleteProduct(productId)
        return res
        .status(200)
        .send({status:"Success",message:"Product successfuly deleted"})
    }catch(error){
        res.status(404).send({ status:"Error",message: error })
    }
})



export default router