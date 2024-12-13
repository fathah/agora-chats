import {ChatClient} from 'react-native-agora-chat';

export const loginUser = async (username: string, token: string) => {
  const isLogged = await ChatClient.getInstance().isLoginBefore();
  if (isLogged) {
    await ChatClient.getInstance().logout();
  }
  await ChatClient.getInstance()
    .loginWithToken(username, token)
    .then((value: any) => {
      console.log(`login success`, value);
    })
    .catch((reason: any) => {
      console.log(`login fail:`, reason);
    });
};
