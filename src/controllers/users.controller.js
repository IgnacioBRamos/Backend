import { usersService } from "../services/users.service.js";




export async function getUsers(req,res){
    try{
        const usersFound = await usersService.getUsers()
        return res.status(200).send({status:"Success",message:"Users Found",payload: usersFound})
    }catch(error){
        return res.status(400).send({status:"Error",message:error})
    }
}

export async function changeUserRole(req,res){
    try{
        const {uid} = req.params
        const user = await userDao.changeUserRole(uid)
        return res.status(200).send({status:"Success",message:"Users Changed Succesfuly",payload: user})
    }
    catch(error){
        return res.status(400).send({status:"Error",message:error})
    }
}

export async function uploadDocuments(req,res){
    const {uid} = req.params
    const name= req.body
    const file = req.file
    try{
        const result = await usersService.uploadDocuments(uid,name,file)
        return res.status(200).send({status:"Success",payload: result})
    }catch(error){
        return res.status(400).send({status:"Error",payload: error})
    }
}