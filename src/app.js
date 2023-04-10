import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.routes.js"
import messageRouter from "./routes/messages.routes.js"
import dotenv from "dotenv"
//import {Server} from "socket.io"
import socket from "./socket.js";
import mongoose from "mongoose";

dotenv.config()



const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", express.static(`${__dirname}/public`));



const httpServer = app.listen(8080,()=>{
    console.log("Servidor arriba del  puerto 8080")

})


const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD




socket.connect(httpServer)




//handlebars configuration
app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')






app.use("/api/messages",messageRouter)
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
app.use("/",viewsRouter)



mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@ecommerce.dm8khzb.mongodb.net/?retryWrites=true&w=majority`)
