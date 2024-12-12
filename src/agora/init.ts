import {ChatClient, ChatOptions} from 'react-native-agora-chat';
import {AgoraConstants} from '../constants/AgoraConstants';

export const initAgora = async (): Promise<boolean> => {
  return await ChatClient.getInstance()
    .init(
      new ChatOptions({
        appKey: AgoraConstants.APP_KEY,
      }),
    )
    .then(() => {
      return true;
    })
    .catch(reason => {
      console.log('init fail:', reason);
      return false;
    });
};
