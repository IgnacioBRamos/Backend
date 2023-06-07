import { messageModel } from "../models/messages.models.js";




export class MessageManager{
    findAll = async()=>{
        const messages = await messageModel.find()
        return messages
    }


    findAllforTemplate = async()=>{
        const messages = await messageModel.find().lean()
        return messages
    }
    createMessage = async(message)=>{
        const messageCreated = await messageModel.create(message)
        return messageCreated
    }
}
