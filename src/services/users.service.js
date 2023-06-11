import { usersRepository } from "../repositories/index.js";

export default class UsersService {
  getUserById = async (id) => {
    try {
      const user = await usersRepository.getUserById(id);
      return user;
    } catch (error) {
      console.log();
      return null;
    }
  };

  createUser = async (user) => {
    try {
      const result = await usersRepository.createUser(user);
      return result;
    } catch (error) {
      console.log();
      return null;
    }
  };
}