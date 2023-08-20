import { userDao } from "../dao/mongo/index.js";
import ContactDTO from "../dao/dtos/user.dto.js";


class UsersRepository {
  getUsers= async ()=>{
    try{
      const usersFound = await userDao.getUsers()
      return usersFound
    }catch(error){
      throw error
    }
  }
  getUserById = async (id) => {
    try {
      const user = await userDao.getUserById(id);
      return user;
    } catch (error) {
      console.log();
      return null;
    }
  };

  createUser = async (user) => {
    try {
      const userDto = new ContactDTO (user)
      const result = await userDao.createUser(userDto);
      return result;
    } catch (error) {
      console.log();
      return null;
    }
  };

  changeUserRole = async (uid)=>{
    try{
      const changeUserRole = await userDao.changeUserRole(uid)
      return changeUserRole
    }catch(error){
      throw error
    }
  }
  uploadDocuments = async(uid,name,file)=>{
    try{
      const documents = await userDao.uploadDocuments(uid,name,file)
      return documents
    }catch(error){
      throw error
    }
  }
  updateLastConnection = async(uid)=>{
    try{
      const lastConnection = await userDao.updateLastConnection(uid)
      return lastConnection
    }catch(error){
      throw error
    }
  }
}



export const usersRepository = new UsersRepository()