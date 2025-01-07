import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";

function CropImageIndex() {

    const navigation = useNavigation();
    const navProps = navigation.getState()!.routes[4].params;
    console.log("Params", navProps);

    return (
        <View>

        </View>
    )
}

export default CropImageIndex;
