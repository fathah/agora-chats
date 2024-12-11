import {USERS_LIST} from '../constants/users';
import {UserType} from '../types/users';

export default class UsersClass {
  static getUsers() {
    return USERS_LIST;
  }

  static getUser(id: string): undefined | UserType {
    return USERS_LIST.find(user => user.id === id);
  }
}
