import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ChatHeader from './ChatHeader';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {UserType} from '../../types/users';
import UsersClass from '../../models/UserModel';
import {conversationStyles} from './style';
import MaterialIcon from '../../components/MaterialIcon';
import {
  ChatClient,
  ChatConversationType,
  ChatMessage,
  ChatMessageEventListener,
  ChatMessageType,
} from 'react-native-agora-chat';
import AgoraMessageCreateCallBack from '../../agora/callback';
import ChatBubble from './ChatBubble';
import {useSignalEffect} from '@preact/signals-react';
import {curUserSignal} from '../../signals/curUser';
import {getUserStatus} from '../../agora/status';
import AttachModal from './AttachModal';
import {ImagePickerResponse} from 'react-native-image-picker';

const ConverstationIndex = () => {
  const flatListRef = useRef<FlatList>(null);
  const [user, setUser] = useState<undefined | UserType>(undefined);
  const [me, setMe] = useState<undefined | UserType>(undefined);
  const [showAttach, setShowAttach] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const navigation = useNavigation();

  useSignalEffect(() => {
    setMe(curUserSignal.value);
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    const params = navigation.getState()!.routes[1].params;
    const id = params.id;
    const user = UsersClass.getUser(id);
    setUser(user);
    getUserStatus();
  };

  const handleTextChange = (text: string) => {
    setInput(text);
  };

  let msgListener = new (class ss implements ChatMessageEventListener {
    onMessagesReceived(messages: ChatMessage[]): void {
      console.log('ConnectScreen.onMessagesReceived', messages);
      setMessages(prev => [...prev, ...messages]);
      flatListRef.current?.scrollToEnd();
    }
    onCmdMessagesReceived(messages: ChatMessage[]): void {
      console.log('ConnectScreen.onCmdMessagesReceived', messages);
    }
    onMessagesRead(messages: ChatMessage[]): void {
      console.log('ConnectScreen.onMessagesRead', messages);
    }
    onMessagesDelivered(messages: ChatMessage[]): void {
      console.log('ConnectScreen.onMessagesDelivered', messages);
    }
    onMessagesRecalled(messages: ChatMessage[]): void {
      console.log('ConnectScreen.onMessagesRecalled', messages);
    }
    onConversationsUpdate(): void {
      console.log('ConnectScreen.onConversationsUpdate');
    }
    onConversationRead(from: string, to?: string): void {
      console.log('ConnectScreen.onConversationRead', from, to);
    }
  })();

  const sendMessage = async () => {
    try {
      if (user === undefined) return;
      const message = input.trim();
      if (message.length < 1) return;
      setInput('');
      const messageObj = ChatMessage.createTextMessage(user.id, message);
      const chatManager = ChatClient.getInstance().chatManager;
      chatManager.sendMessage(messageObj, new AgoraMessageCreateCallBack());
      setMessages(prev => [...prev, messageObj]);
      // sendNotification(user.id, 'New Message', message);
    } catch (error) {
      console.log('Error Sending Message', error);
    }
  };

  const getConversation = async () => {
    if (user === undefined) return;
    const allConversations = await ChatClient.getInstance().chatManager.getMsgs(
      {
        convId: user.id,
        convType: ChatConversationType.PeerChat,
        startMsgId:'',
      },
    );
    setMessages(allConversations);

    setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
  };

  const onAttachClick = () => {
    setShowAttach(prev => !prev);
  };

  useEffect(() => {
    if (user) {
      getConversation();
    }
    return () => {
      ChatClient.getInstance().chatManager.addMessageListener(msgListener);
    };
  }, [user]);

  const sendImages = async (images: ImagePickerResponse) => {
    if (images.assets && images.assets.length < 1) return;
    const message = ChatMessage.createImageMessage(
      user?.id,
      images.assets[0].uri,
    );
    const chatManager = ChatClient.getInstance().chatManager;
    const resp = await chatManager.sendMessage(
      message,
      new AgoraMessageCreateCallBack(),
    );
    console.log('Send Image', resp);
    setMessages(prev => [...prev, message]);
  };

  if (user === undefined) {
    return (
      <View>
        <Text>User Not Found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ChatHeader user={user} />
      <FlatList
        ref={flatListRef}
        data={messages}
        ListHeaderComponent={<View style={{height: 10}}></View>}
        renderItem={({item}) => <ChatBubble myId={me?.id} msg={item} />}
        style={{
          flex: 1,
        }}
      />
      <View style={conversationStyles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={handleTextChange}
          placeholder="Enter Message"
          style={conversationStyles.chatinput}
        />
        <TouchableOpacity
          style={conversationStyles.attachButton}
          onPress={onAttachClick}>
          <MaterialIcon icon="attachment" color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={conversationStyles.chatSendButton}
          onPress={sendMessage}>
          <MaterialIcon icon="send" color="white" />
        </TouchableOpacity>
      </View>

      <AttachModal
        show={showAttach}
        onClose={onAttachClick}
        onAttach={sendImages}
      />
    </SafeAreaView>
  );
};

export default ConverstationIndex;

