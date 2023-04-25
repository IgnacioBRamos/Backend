import {Router} from "express"
//import { ProductManager } from "../dao/fileManagers/productManager.js";
import { uploader } from "../utils.js";
//import { productModel } from "../dao/models/products.models.js";
import { ProductManager } from "../dao/dbManagers/productsManager.js";


const router = Router()



const productManager = new ProductManager()



router.get("/",async(req,res)=>{
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const sort = req.query.sort
    const query = req.query.query
    try{
        let products = await productManager.findAll(limit,page,sort,query)
        console.log(products)
        return res.status(200).send({status:"Success",payload:products})
    }catch(error){
        return res.status(400).send({status:"Error",message: error})
    }
})
router.get("/:pid",async(req,res)=>{
    try{
        const {pid} = req.params
        let product = await productManager.findProductById(pid)
        
        return res.status(200).send({status:"Success",payload:product})
    }catch(error){
        return res.status(400).send({status:"Error",message: error})
    }
})

router.post("/",uploader.array("thumbnails",5),async(req,res)=>{
    const products = req.body
    const filename = req.files;
    try{
        const createdProduct = await productManager.createProduct(products,filename)
        return res.send({status:"Success",payload:createdProduct})
    }catch(error){
        return res.status(400).send({status:"Error",message: error})
    }
})

router.put("/:pid",async (req,res)=>{
    const {pid} = req.params
    const changes = req.body
    try{
        await productManager.updateProduct(pid,changes)
        return res.status(200).send({status:"OK",message:"Product succesfully updated"})
    }
    catch(error){
        return res.status(400).send({status:"Error",message: error})
    }
})

router.delete("/:pid",async(req,res)=>{
    const {pid}= req.params
    try{
        await productManager.deleteProduct(pid)
        return res.status(200).send({status:"OK",message:"Product succesfully deleted"})
    }
    catch(error){
        return res.status(400).send({status:"Error",message: error})
    }
})







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

// router.get("/:pid",async(req,res)=>{

//     let idProduct = parseInt(req.params.pid)
//     try{
//         const product = await productManager.getProductsById(idProduct)
//         res.status(200).send({status:"OK",message:product})
//     }catch (error) {
//         res.status(404).send({ status:"Error",message: error })
//     }
// })
// router.post("/", uploader.array("thumbnails",5),async(req,res)=>{    
//     const filename = req.files;
//     let product = req.body
//     try{
//         await productManager.addProduct(product,filename)
//         return res.status(201).send({status:"Success",message:"Product created"})
//     }catch(error){
//         res.status(400).send({ status:"Error",message: error })
//     }
// })

// router.put("/:id",async(req,res)=>{

//     let productId = Number(req.params.id)
//     let changes = req.body

//     try{
//         await productManager.updateProduct(productId,changes)
//         return res.status(200).send({status:"OK",message:"Product succesfully updated"})
//     }catch(error){
//         res.status(404).send({ status:"Error",message: error })
//     }
// })

// router.delete("/:id",async(req,res)=>{
//     const productId = Number(req.params.id)
    
//     try{
//         await productManager.deleteProduct(productId)
//         return res
//         .status(200)
//         .send({status:"Success",message:"Product successfuly deleted"})
//     }catch(error){
//         res.status(404).send({ status:"Error",message: error })
//     }
// })



export default router