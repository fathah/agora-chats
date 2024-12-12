export default class AgoraMessageCreateCallBack {
  onProgress(locaMsgId: any, progress: any) {
    console.log(`send message process: ${locaMsgId}, ${progress}`);
  }
  onError(locaMsgId: any, error: any) {
    console.log(`send message fail: ${locaMsgId}, ${JSON.stringify(error)}`);
  }

  onSuccess(message: any) {
    console.log('send message success: ' + message.localMsgId);
  }
}
