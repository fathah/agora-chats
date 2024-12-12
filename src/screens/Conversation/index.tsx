import { FlatList, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import ChatHeader from "./ChatHeader";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { UserType } from "../../types/users";
import UsersClass from "../../models/UserModel";
import { conversationStyles } from "./style";
import MaterialIcon from "../../components/MaterialIcon";
import { ChatClient, ChatMessage } from "react-native-agora-chat";
import AgoraMessageCreateCallBack from "../../agora/callback";

const ConverstationIndex = () => {

    const bg = require('./assets/images/chatbg.jpg');

    const [user, setUser] = useState<undefined | UserType>(undefined);
    const [messages, setMessages] = useState([]);
    const messageRef = useRef('');

    const navigation = useNavigation();
    
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
        messageRef.current = text;
    } 

    const sendMessage = async () => {
        if(user === undefined) return;
        const message = messageRef.current;
        console.log("Text is==>",message);
        
        messageRef.current = '';
       const messageObj =  ChatMessage.createTextMessage(user.id, message);
        const chatManager = ChatClient.getInstance().chatManager;
        chatManager.sendMessage(messageObj, new AgoraMessageCreateCallBack());

    }

    if (user === undefined) {
        return <View>
            <Text>User Not Found</Text>
        </View>;
    }

    

    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover', }}
        source={bg}
        >
            <ChatHeader user={user} />
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text>Message</Text>}
                style={{
                    flex: 1
                }}
            />
            <View style={conversationStyles.inputContainer}>
            <TextInput onChangeText={handleTextChange} placeholder="Enter Message"
                style={conversationStyles.chatinput}
                />
                <TouchableOpacity style={conversationStyles.chatSendButton} onPress={sendMessage}>
                    <MaterialIcon icon="send" color="white"/>
                    </TouchableOpacity>
                
           </View>
        </ImageBackground>
    );
}

export default ConverstationIndex;