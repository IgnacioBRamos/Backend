import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.routes.js"
import messageRouter from "./routes/messages.routes.js"
import socket from "./socket.js";
import dataBase from "./db.js";
import sessionsRouter from "./routes/sessions.routes.js"
import session from "express-session";
import MongoStore from "connect-mongo";

import config from "./config.js";
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", express.static(`${__dirname}/public`));

app.use(session({
    store:MongoStore.create({
        mongoUrl:config.dbUrl,
        ttl:20
    }),
    resave:false,
    saveUninitialized:true,
    secret:"sdsada"
}))




const httpServer = app.listen(8080,()=>{
    console.log("Servidor arriba del  puerto 8080")

})







socket.connect(httpServer)




//handlebars configuration
app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')





app.use("/api/sessions",sessionsRouter)
app.use("/api/messages",messageRouter)
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
app.use("/",viewsRouter)



dataBase.connect()