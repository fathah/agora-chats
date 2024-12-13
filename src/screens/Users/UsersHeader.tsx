import { Text, View } from "react-native";
import { usersStyle } from "./style";
import ToggleMe from "./ToggleMe";

const UsersHeader = () => {
    return (
        <View style={usersStyle.header}>
            <Text style={usersStyle.headerText}>Chats</Text>
            <ToggleMe/>
        </View>
    );
}

export default UsersHeader;