import mongoose from "mongoose";


const messagesCollection = "messages"
 
const messageSchema = new mongoose.Schema({
    email: String,
    message: String
})

const messageModel = mongoose.model(messagesCollection,messageSchema)
export {messageModel}