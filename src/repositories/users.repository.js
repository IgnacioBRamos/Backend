import { userDao } from "../dao/mongo/index.js";
import ContactDTO from "../dao/dtos/user.dto.js";


export default class UsersRepository {
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
}