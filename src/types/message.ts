type MessageBody = {
  content: string;
};
type Message = {
  body: MessageBody;
  from: string;
  to: string;
  msgId: string;
  status: number;
  localTime: number;
  serverTime: number;
};

export type {Message};
