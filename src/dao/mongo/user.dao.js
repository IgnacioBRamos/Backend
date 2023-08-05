import userModel from "../models/users.model.js";

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
      if(user.role == "premium"){
        const changes = {
          ...user,
          role: "user"
        }
        const userChanged = await userModel.updateOne({ _id: uid }, changes)
        return user
      }else{
        const changes = {
          ...user,
          role: "premium"
        }
        const userChanged = await userModel.updateOne({ _id: uid }, changes)
        return user
      }
    }
    catch (error) {
      throw error
    }
  }
}