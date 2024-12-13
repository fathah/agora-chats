import {AgoraConstants} from '../constants/AgoraConstants';

export const sendNotification = async (
  username: string,
  title: string,
  content: string,
) => {
  const url = `${AgoraConstants.CHAT_HOST}/${AgoraConstants.ORG_NAME}/${AgoraConstants.APP_NAME}/push/single`;
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AgoraConstants.APP_TOKEN}`,
      },
      body: JSON.stringify({
        targets: [username],
        strategy: 1,
        pushMessage: {
          title,
          subtitle: "Ther's a message",
          content,
        },
      }),
    });
    console.log(resp);
  } catch (error) {
    console.log('Error:', error);
  }
};
