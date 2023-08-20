import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.routes.js"
import messageRouter from "./routes/messages.routes.js"
import usersRouter from "./routes/users.routes.js"
import socket from "./socket.js";
import dataBase from "./db.js";
import sessionsRouter from "./routes/sessions.routes.js"
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import config from "./config.js";
import { errorMiddleware } from "./errors/error.middleware.js";
import { addLogger } from "./middlewares/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express"
import paymentRouter from "./routes/payment.routes.js"



const app = express();
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", express.static(`${__dirname}/public`));

app.use(session({
    store:MongoStore.create({
        mongoUrl:config.dbUrl,
        ttl:600
    }),
    resave:false,
    saveUninitialized:true,
    secret:"sdsada"
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


const httpServer = app.listen(PORT, () => console.log(`Listening on ${PORT}`));



const swaggeroptions={
    definition:{
        openapi: "3.0.1",
        info:{
            title:"",
            description:""
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}

const spec = swaggerJSDoc(swaggeroptions)
app.use("/apidocs",swaggerUiExpress.serve,swaggerUiExpress.setup(spec))

socket.connect(httpServer)


app.use(addLogger)

//handlebars configuration
app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')



app.use("/api/payment",paymentRouter)
app.use("/api/users",usersRouter)
app.use("/api/sessions",sessionsRouter)
app.use("/api/messages",messageRouter)
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
app.use("/",viewsRouter)


app.get("/loggerTest",(req,res)=>{
    req.logger.error("ERROR")
    req.logger.debug("WARNING")
    res.send({message:"Esta es una prueba"})
})

dataBase.connect()
app.use(errorMiddleware)