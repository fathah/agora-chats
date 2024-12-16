import {FlatList, PermissionsAndroid, View} from 'react-native';
import {UserType} from '../../types/users';
import UserTile from './UserTile';
import UsersClass from '../../models/UserModel';
import {useEffect, useState} from 'react';
import {curUserSignal} from '../../signals/curUser';
import {loginUser} from '../../agora/login';
import {ChatClient} from 'react-native-agora-chat';
import UsersHeader from './UsersHeader';
import {useSignalEffect} from '@preact/signals-react';

const UsersIndex = () => {
  const [users, setUsers] = useState<UserType[]>(UsersClass.getChatUsers());

  const loginCurrentUser = async () => {
    const isLogged = await ChatClient.getInstance().isLoginBefore();
    if (isLogged) return;
    const curUser = curUserSignal.value;
    await loginUser(curUser.id, curUser.token);
  };

  useEffect(() => {
    setTimeout(() => loginCurrentUser(), 1500);
  }, []);

  const renderItem = ({item}: {item: UserType}) => <UserTile user={item} />;

  useSignalEffect(() => {
    if (curUserSignal.value) {
      setUsers(UsersClass.getChatUsers());
    }
  });

  useEffect(() => {
    PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS')
      .then(res => {
        console.log('Notification Success', res);
      })
      .catch(e => {
        console.log('Notification Error', e);
      });
  }, []);

  return (
    <View>
      <UsersHeader />
      <FlatList data={users} renderItem={renderItem} />
    </View>
  );
};

export default UsersIndex;
