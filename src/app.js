import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.routes.js"
//import {Server} from "socket.io"
import socket from "./socket.js";




const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", express.static(`${__dirname}/public`));


const httpServer = app.listen(8080,()=>{
    console.log("Servidor arriba del  puerto 8080")
})




socket.connect(httpServer)




//handlebars configuration
app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')







app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
app.use("/",viewsRouter)




