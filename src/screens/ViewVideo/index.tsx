import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Video from "react-native-video";

function ViewVideo() {
    const navigation = useNavigation();

    const navProps = navigation.getState()!.routes[2].params;
    const videoUri = navProps?.video;

    return <View style={styles.rootContainer}>
        <Video
            source={{ uri: videoUri }}
            style={styles.video}
            resizeMode="contain"
            repeat
        />

    </View>
}

export default ViewVideo;

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        position:'relative',
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "black",

    },
    video: {
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%"
    },

});
