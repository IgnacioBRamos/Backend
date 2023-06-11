import mongoose from "mongoose";
import config from "../config.js";


export let contacts

switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect(config.dbUrl)
        const {productDao} = await import("./mongo/index.js")
        contacts = productDao
        break;

    case "MEMORY":
        const productsMemory = await import("./memory/productManager.js")
        contacts = productsMemory 
        break;
}

