import { useSignalEffect } from "@preact/signals-react";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { curUserSignal } from "../../signals/curUser";
import { UserType } from "../../types/users";
import UsersClass from "../../models/UserModel";
import { usersStyle } from "./style";

const ToggleMe = () => {

    const [curUser, setCurUser] = useState<null | UserType>(null);
    
    useSignalEffect(() => {
        const usr = curUserSignal.value;
        setCurUser(usr);
    });

    const handleUserChange = () => {
        const users = UsersClass.getUsers();
        if (curUser?.id === 'fathah') {
            curUserSignal.value = users[1];
        } else {
            curUserSignal.value = users[0];
        }
        
    }

    return (
        <View>
            <TouchableOpacity onPress={handleUserChange} style={usersStyle.toggleUser}>
                <Text style={usersStyle.toggleLabel}>{curUser?.name??"No user"}</Text>
                </TouchableOpacity>
        </View>
    );
}

export default ToggleMe;