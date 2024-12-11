import {signal} from '@preact/signals-react';
import {UserType} from '../types/users';
import {USERS_LIST} from '../constants/users';

export const curUserSignal = signal<UserType>(USERS_LIST[0]);
