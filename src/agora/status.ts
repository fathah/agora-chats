import {ChatPresenceManager} from 'react-native-agora-chat';

export const getUserStatus = async () => {
  console.log('Checking Status');

  const presenceManager = new ChatPresenceManager();
  const resp = await presenceManager.fetchPresenceStatus(['fathah']);
  console.log('User Status', resp);
};
