import express from "express";
import { ProductManager } from "./productManager.js";

const productManager = new ProductManager()

const app = express();

app.get("/products",async(req,res)=>{
    try{
        let limit = parseInt(req.query.limit)
        let products = await productManager.getProducts()
        let num = products.length - limit
            if(!limit)  return res.send(products);
            for(let i=0; i< num; i++){
                await products.pop()
            }
            res.send(products)
    }catch(error){
        console.log(error)
    }
})


app.get("/products/:pid",async(req,res)=>{
    try{
        let idProduct = parseInt(req.params.pid)
        const product = await productManager.getProductsById(idProduct)
        res.send(product)
    }
    catch(error){
        console.log(error)
    }
})

app.listen(8080,()=>{
    console.log("Servidor arriba del  puerto 8080")
})




