import { useSignalEffect } from "@preact/signals-react";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { curUserSignal } from "../../signals/curUser";
import { UserType } from "../../types/users";
import UsersClass from "../../models/UserModel";
import { usersStyle } from "./style";
import { loginUser } from "../../agora/login";

const ToggleMe = () => {

    const [curUser, setCurUser] = useState<null | UserType>(null);
    
    useSignalEffect(() => {
        const usr = curUserSignal.value;
        setCurUser(usr);
        
    });

    const handleUserChange = async () => {
        const users = UsersClass.getUsers();
        const newUser = curUser?.id === 'fathah' ? users[1] : users[0];
        curUserSignal.value = newUser;
        await loginUser(newUser.id, newUser.token);

        
    }

    return (
        <View>
            <TouchableOpacity onPress={handleUserChange} style={usersStyle.toggleUser}>
                <Text style={usersStyle.toggleLabel}>Switch User {curUser?.name??"No user"}</Text>
                </TouchableOpacity>
        </View>
    );
}

export default ToggleMe;