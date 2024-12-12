import { FlatList, View } from "react-native";
import { UserType } from "../../types/users";
import UserTile from "./UserTile";
import UsersClass from "../../models/UserModel";
import ToggleMe from "./ToggleMe";
import { useEffect } from "react";
import { curUserSignal } from "../../signals/curUser";
import { loginUser } from "../../agora/login";
import { ChatClient } from "react-native-agora-chat";

const UsersIndex = () => {


    const loginCurrentUser = async () => {

        const isLogged = await ChatClient.getInstance().isLoginBefore();
        if(isLogged) return;
        const curUser = curUserSignal.value;
        await loginUser(curUser.id, curUser.token);
    }

    useEffect(() => {
        loginCurrentUser();
    },[])


   


    const users = UsersClass.getUsers();
    const renderItem = ({ item }: { item: UserType }) => <UserTile user={item} />;
    


    return (
        <View>
            <FlatList
                data={users}
                renderItem={renderItem}
                ListFooterComponent={<ToggleMe/>}
            />

        </View>
    );
}

export default UsersIndex;