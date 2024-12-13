import { FlatList, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import ChatHeader from "./ChatHeader";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { UserType } from "../../types/users";
import UsersClass from "../../models/UserModel";
import { conversationStyles } from "./style";
import MaterialIcon from "../../components/MaterialIcon";
import { ChatClient, ChatConversationType, ChatMessage, ChatMessageType, ChatSearchDirection } from "react-native-agora-chat";
import AgoraMessageCreateCallBack from "../../agora/callback";
import ChatBubble from "./ChatBubble";
import { useSignalEffect } from "@preact/signals-react";
import { curUserSignal } from "../../signals/curUser";

const ConverstationIndex = () => {


    const [user, setUser] = useState<undefined | UserType>(undefined);
    const [me, setMe] = useState<undefined | UserType>(undefined);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');

    const navigation = useNavigation();
    const flatListRef = useRef(null);



    useSignalEffect(() => {
        setMe(curUserSignal.value);
    })

    useEffect(() => {
        getUserData();
    }, []);
    
    const getUserData = () => {
        const params = navigation.getState().routes[1].params;
        const id = params.id;
        const user = UsersClass.getUser(id);
        setUser(user);
    }

    const handleTextChange = (text: string) => {
        setInput(text);
    } 


    const sendMessage = async () => {
        if(user === undefined) return;
        const message =input.trim();
        if (message.length < 1) return;
        setInput('');
       const messageObj =  ChatMessage.createTextMessage(user.id, message);
        const chatManager = ChatClient.getInstance().chatManager;
        chatManager.sendMessage(messageObj, new AgoraMessageCreateCallBack());
        setMessages((prev)=>[...prev, messageObj]);

    }

    const getConversation = async () => {
        if (user === undefined) return;
        const convs = await ChatClient.getInstance().chatManager.getMsgsWithMsgType({
            convId: user.id,
            convType: ChatConversationType.PeerChat,
            msgType: ChatMessageType.COMBINE,
      
        });
        setMessages(convs);
        
        
    }


    useEffect(() => {
        if (user) {
            getConversation(); 
        }
        
    }, [user])
    

    if (user === undefined) {
        return <View>
            <Text>User Not Found</Text>
        </View>;
    }

    

    return (
        <View style={{ flex: 1}}
        
        >
            <ChatHeader user={user} />
            <FlatList
                ref={flatListRef}
                data={messages}
                ListHeaderComponent={<View style={{height: 10}}></View>}
                renderItem={({ item }) => <ChatBubble myId={ me?.id} msg={item} />}
                style={{
                    flex: 1
                }}
            />
            <View style={conversationStyles.inputContainer}>
                <TextInput
                    value={input}
                    onChangeText={handleTextChange}
                    placeholder="Enter Message"
                    
                style={conversationStyles.chatinput}
                />
                <TouchableOpacity style={conversationStyles.chatSendButton} onPress={sendMessage}>
                    <MaterialIcon icon="send" color="white"/>
                    </TouchableOpacity>
                
           </View>
        </View>
    );
}

export default ConverstationIndex;