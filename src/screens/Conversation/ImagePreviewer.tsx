import {Image, View} from "react-native";
import {PickImageResponse} from "../../types/pickImageType.ts";

const ImagePreviewer = ({images}:{images:PickImageResponse}       ) => {

    return <View style={styles.container}>
    <Image
        source={{ uri: images.assets[0].uri }}
        style={styles.image}
        resizeMode="cover" // Optional: Adjust how the image fits.
    />
</View>;
};

export default ImagePreviewer;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200, // Set dimensions as needed
    },
});
