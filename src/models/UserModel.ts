import {USERS_LIST} from '../constants/users';
import {curUserSignal} from '../signals/curUser';
import {UserType} from '../types/users';

export default class UsersClass {
  static getUsers() {
    return USERS_LIST;
  }

  static getChatUsers() {
    const curUser = curUserSignal.value;
    return USERS_LIST.filter(user => user.id !== curUser.id);
  }

  static getUser(id: string): undefined | UserType {
    return USERS_LIST.find(user => user.id === id);
  }
}
