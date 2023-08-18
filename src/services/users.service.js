import {usersRepository} from "../repositories/users.repository.js"

class UsersService {

  getUsers = async() => {
    try{
      const usersFound = await usersRepository.getUsers()
      return usersFound
    }catch(error){
      throw error
    }
  }
  getUserById = async (id) => {
    try {
      const user = await usersRepository.getUserById(id);
      return user;
    } catch (error) {
      throw error
    }
  };

  createUser = async (user) => {
    try {
      const result = await usersRepository.createUser(user);
      return result;
    } catch (error) {
      throw error
    }
  };
  changeUserRole = async (uid)=>{
    try{
      const changeUserRole = await usersRepository.changeUserRole(uid)
      return changeUserRole
    }catch(error){
      throw error
    }
  }

  uploadDocuments = async(uid,name,file)=>{
    try{
      const documents = await usersRepository.uploadDocuments(uid,name,file)
      return documents
    }catch(error){
      throw error
    }
  }
}


export const usersService = new UsersService()

