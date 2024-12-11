import { FlatList, View } from "react-native";
import { UserType } from "../../types/users";
import UserTile from "./UserTile";
import UsersClass from "../../models/UserModel";
import ToggleMe from "./ToggleMe";

const UsersIndex = () => {
    const users = UsersClass.getUsers();


    const renderItem = ({ item }: { item: UserType }) => <UserTile user={item}/>;

   
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