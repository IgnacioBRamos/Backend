import userModel from "../models/users.model.js";
import { createHash,isValidPassword } from "../../utils.js";


export default class User {
  constructor() { }
  getUsers = async ()=>{
    try{
      const usersFound = await userModel.find()
      return usersFound
    }catch(error){
      console.log(error)
    }
  }
  getUserById = async (id) => {
    try {
      const foundUser = await userModel.findOne({ _id: id }).lean();
      if(!foundUser){
        throw "User NOt FOund"
      }
      return foundUser;
    } catch (error) {
      console.log(error);
    }
  };

  createUser = async (user) => {
    try {
      const result = await userModel.create(user);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  changeUserRole = async (uid) => {
    
    try {
      const user = await userModel.findOne({ _id: uid }).lean()
      if(!user){
        throw "User not found"
      }
      let userChanged
      if(user.role == "premium"){
        const changes = {
          ...user,
          role: "user"
        }
        userChanged = await userModel.updateOne({ _id: uid }, changes)  
      }else{
        const changes = {
          ...user,
          role: "premium"
        }
        userChanged = await userModel.updateOne({ _id: uid }, changes)
      }
      return "User succesfuly changed"
    }
    catch (error) {
      throw error
    }
  }

  uploadDocuments = async(uid,name,file)=>{
    const user = await this.getUserById(uid)
   
    let filePath
    if(file.filename.endsWith(".jpg"||".png"|| ".jepg")){
      filePath = `http://localhost:8080/profiles/${file.filename}`
    }else{
      filePath = `http://localhost:8080/documents/${file.filename}`  
    }
  
    user.documents = []
  
    if(!file || !name || !uid){
      throw "ERROR"
    }
    
    const newDocument = {
      name: name.name,
      reference: filePath
    }
    const userChanged = await userModel.updateOne({ _id: uid }, {$push:{documents:newDocument}})
    return userChanged
  }
}