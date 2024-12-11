import { Text, TouchableOpacity, View } from "react-native";
import { UserType } from "../../types/users";
import { usersStyle } from "./style";
import { useNavigation } from "@react-navigation/native";

const UserTile = ({ user }: { user: UserType }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Converstation', { id: user.id });
    }
    return (
        <TouchableOpacity  style={usersStyle.userTile} onPress={handlePress}>
            <View style={usersStyle.userProfile}>
            <Text>{user.name[0]}</Text>
        </View>
        <Text>{user.name}</Text>
    </TouchableOpacity>
    );
}

export default UserTile;