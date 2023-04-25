import mongoose from "mongoose";
import config from "./config.js";


const {dbUrl} = config

const dataBase ={
    connect: async function(){
        try{
            await mongoose.connect(dbUrl)
        }
        catch(error){
            console.log(error)
        }
    }
}

export default dataBase