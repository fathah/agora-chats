import { Text, TextInput, View } from "react-native";
import ChatHeader from "./ChatHeader";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { UserType } from "../../types/users";
import UsersClass from "../../models/UserModel";
import AC from 'agora-chat';
import { AgoraConstants } from "../../constants/AgoraConstants";

const ConverstationIndex = () => {

    const [user, setUser] = useState<undefined | UserType>(undefined);
    const messageRef = useRef('');

    const navigation = useNavigation();
    
    useEffect(() => {
        getUserData();
    }, [])

  
    
    const getUserData = () => {
        const params = navigation.getState().routes[1].params;
        const id = params.id;
        const user = UsersClass.getUser(id);
        setUser(user);
    }

    const handleTextChange = (text: string) => {
        messageRef.current = text;
    } 

    if (user === undefined) {
        return <View>
            <Text>User Not Found</Text>
        </View>;
    }

    const conn = new AC.connection({
        appKey: AgoraConstants.APP_KEY,
    });

    const options = {
        user: user.id,
        accessToken: user.token
    }
    
    conn.open(options);





    return (
        <View>
            <ChatHeader user={user} />
            <TextInput onChangeText={handleTextChange} placeholder="Enter Message"
            />
        </View>
    );
}

export default ConverstationIndex;