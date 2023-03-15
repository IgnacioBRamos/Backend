import express from "express";
import productsRouter from "./routes/users.routes.js"
import cartsRouter from "./routes/cart.routes.js"
import __dirname from "./utils.js";

import { ProductManager } from "./productManager.js";

//const productManager = new ProductManager()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", express.static(`${__dirname}/public`));


app.listen(8080,()=>{
    console.log("Servidor arriba del  puerto 8080")
})




app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)










