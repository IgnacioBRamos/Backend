import {Router} from "express"
import fs from "fs"
import { ProductManager } from "../productManager.js";
import { uploader } from "../utils.js";


const router = Router()

const productManager = new ProductManager()

let products = await productManager.getProducts()


const path= productManager.path

router.get("/",(req,res)=>{
        if(products.length ===0){
            return res
            .status(404)
            .send({status:"Error",message:"There are not oroducts registered"})
        }
        let limit = parseInt(req.query.limit)
        if(!limit)  return res.status(200).send({status:"OK",message:products})
        const otro = products.filter(el=> el.id<=limit)
        return res.status(200).send({status:"OK",message:otro})

})

router.get("/:pid",async(req,res)=>{

    let idProduct = parseInt(req.params.pid)
    const product = await productManager.getProductsById(idProduct)
    res.status(200).send({status:"OK",message:product})
})
router.post("/", uploader.single("thumbnails"),async(req,res)=>{
    const filename = req.file.filename;
    let user = req.body

    if (!filename) {
        return res
          .status(400)
          .send({ status: "Error", error: "No se pudo agregar el archivo" });
      }
    



    if(!user.title || !user.description || !user.price || !user.code || !user.category || !user.stock){
        return res
        .status(400)//bad request , no llenaste bien los parametros
        .send({status:"Error",error:"incomplete values"})
    }
    user.status = true
    user.thumbnails =[]
    user.thumbnails.push(`http://localhost:8080/images/${filename}`)
    products.length === 0 
    ? (user.id = 1)
    : (user.id = products[products.length-1].id+1)

    products.push(user)
    await fs.promises.writeFile(path,JSON.stringify(products,null,"\t"))
    return res.status(201).send({status:"Success",message:"User created"})
})

router.put("/:id",async(req,res)=>{
    let userId = Number(req.params.id)
    let changes = req.body

    let userIndex = products.findIndex((u)=> u.id === userId)

    if(userIndex === -1){
        return res.status(400).send({status:"Error",message:"Cannot update UserId"})
    }
    if (changes.id) {
        return res
          .status(400)
          .send({ status: "Error", message: "Cannot update User id" });
      }

    const user = products[userIndex]

    const updateUser = {
        ...user,
        ...changes
    }
    products.splice(userIndex,1,updateUser)
    await fs.promises.writeFile(path,JSON.stringify(products,null,"\t"))
    return res.status(200).send({status:"OK",message:"User succesfully updated"})
})

router.delete("/:id",async(req,res)=>{
    const userId = req.params.id
    const userIndex = products.findIndex((u)=>u.id == userId)

    if(userId===-1){
        return res
        .status(404)
        .send({status:"Error",message:"User does not exist"})
    }
    products.splice(userIndex,1)
    await fs.promises.writeFile(path,JSON.stringify(products,null,"\t"))
    return res
    .status(200)
    .send({status:"Success",message:"User successfuly deleted"})
})



export default router