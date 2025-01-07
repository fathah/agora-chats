import {
  ActivityIndicator,
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Video from "react-native-video";
import {
    GestureDetector, Gesture, GestureHandlerRootView
} from "react-native-gesture-handler";
import {calculateContainerDimensions, CropBox} from "./utils.ts";
import {cropVideo} from "./crop.ts";
import {useAnimatedStyle, useDerivedValue, useSharedValue} from "react-native-reanimated";




function CropVideo() {

    const navigation = useNavigation();

    const navProps = navigation.getState()!.routes[2].params;
const videoUri = navProps?.video;
const videoHeight = navProps?.height;
const videoWidth = navProps?.width;
const fileName = navProps?.fileName;





    const {width, height} = useMemo(()=>calculateContainerDimensions(videoWidth, videoHeight), [videoWidth, videoHeight]);

    const initialCropBox = useMemo(()=>({x: 0, y: 0, width, height}), [width, height]);

    const [cropping, setCropping] = useState(false);



    const cropBoxRef = useRef<CropBox>(initialCropBox);


const cropBox = useSharedValue(initialCropBox);



const cropBoxStyle = useDerivedValue(() => ({
    left: cropBox.value.x,
    top: cropBox.value.y,
    width: cropBox.value.width,
    height: cropBox.value.height,
}),[]);


    // Gesture for moving the crop box
    const moveGesture = Gesture.Pan()
        .onUpdate((event) => {
            console.log("Moving====>");
             const newX = Math.max(0, Math.min(width - cropBox.value.width, cropBox.value.x + event.translationX));
             const newY = Math.max(0, Math.min(height - cropBox.value.height, cropBox.value.y + event.translationY));
            cropBox.value = {...cropBox.value, x: newX, y: newY};
        });

    // Gesture for resizing (can be extended for each handle)
    const resizeGesture = Gesture.Pan()
        .onUpdate((event) => {
            console.log("Updating+++");
            const newWidth = Math.max(50, Math.min(width - cropBox.value.x, cropBox.value.width + event.translationX));
            const newHeight =  Math.max(50, Math.min(height - cropBox.value.y, cropBox.value.height + event.translationY));
            console.log("Before Handling Resize", cropBox.value);
            cropBox.value = {...cropBox.value, width: newWidth, height: newHeight};
            console.log("After Handling Resize", cropBox.value);
        });




    // const handleGestureEvent = useCallback((event: GestureEvent<PanGestureHandlerEventPayload>) => {
    //     const current = cropBoxRef.current;
    //     const newCropBox =  scaleDimensionOnGesture(event, width, height, current);
    //     cropBoxRef.current = newCropBox;
    //     setCropBox({...newCropBox});
    // },[height, width]);
    //
    //
    // const onResize = useCallback((event:  GestureEvent<PanGestureHandlerEventPayload>, direction: string) => {
    //     const current = cropBoxRef.current;
    //     const newValue = handleResizeGesture(event, direction, current, width, height);
    //     cropBoxRef.current = newValue;
    //     setCropBox({...newValue});
    // }, [width, height]);


const onCropClick = useCallback(()=>{

    setCropping(true);
    cropVideo(videoUri, fileName, videoWidth, videoHeight, width, height, cropBoxRef).then((resp)=>{
        setCropping(false);
        if(resp.success){
            console.log("New Path==>", resp.path);
            navigation.navigate('ViewVideo', {video: resp.path});
        }else{
            Alert.alert("Crop Failed", "Failed to crop video");
        }

    });
},[navigation,fileName, height, videoHeight, videoUri, videoWidth, width]);


if(!videoUri){
    return  <View>
        <Text>Video Not Found</Text>
    </View>;
}


    return (
            <GestureHandlerRootView style={styles.rootContainer}>

                <GestureDetector gesture={moveGesture}>
                    {/* Video Player */}
                  <View style={{width, height}}>
                      <Video
                          source={{ uri: videoUri }}
                          style={styles.video}
                          resizeMode="contain"
                          repeat
                      />
                      <Animated.Text style={{position:'absolute', fontSize:30}}>Value is{cropBoxStyle.value.width}</Animated.Text>
                      {/*<Animated.View style={[styles.cropBox, cropBoxStyle]} />*/}

                      <GestureDetector gesture={resizeGesture}><View style={[styles.resizeHandle, styles.topLeftHandle]} /></GestureDetector>
                      <GestureDetector gesture={resizeGesture}><View style={[styles.resizeHandle, styles.topRightHandle]} /></GestureDetector>
                      <GestureDetector gesture={resizeGesture}><View style={[styles.resizeHandle, styles.bottomLeftHandle]} /></GestureDetector>
                      <GestureDetector gesture={resizeGesture}><View style={[styles.resizeHandle, styles.bottomRightHandle]} /></GestureDetector>




                  </View>


                    {/*<View style={[styles.overlay, {top: 0, width: width, height: cropBox.y}]}/>*/}
                    {/*<View style={[styles.overlay, {bottom: 0, width:width, height: height - cropBox.y - cropBox.height}]}/>*/}
                    {/*<View style={[styles.overlay, {left: 0, height: height, width: cropBox.x}]}/>*/}
                    {/*<View style={[styles.overlay, {right: 0, height: height, width: width - cropBox.x - cropBox.width}]}/>*/}

                    {/* Crop Overlay */}
                    {/*<PanGestureHandler onGestureEvent={handleGestureEvent}>*/}
                    {/*    <View*/}
                    {/*        style={[*/}
                    {/*            styles.cropBox,*/}
                    {/*            {*/}
                    {/*                width: cropBox.width,*/}
                    {/*                height: cropBox.height,*/}
                    {/*                left: cropBox.x,*/}
                    {/*                top: cropBox.y,*/}
                    {/*            },*/}
                    {/*        ]}*/}
                    {/*    >*/}
                    {/*        <PanGestureHandler*/}
                    {/*            onGestureEvent={(event) => onResize(event, "top-left")}>*/}
                    {/*            <View style={[styles.resizeHandle, styles.topLeftHandle]} />*/}
                    {/*        </PanGestureHandler>*/}

                    {/*        <PanGestureHandler*/}
                    {/*            onGestureEvent={(event) => onResize(event, "top-right")}>*/}
                    {/*            <View style={[styles.resizeHandle, styles.topRightHandle]} />*/}
                    {/*        </PanGestureHandler>*/}

                    {/*        <PanGestureHandler*/}
                    {/*            onGestureEvent={(event) => onResize(event, "bottom-left")}>*/}
                    {/*            <View style={[styles.resizeHandle, styles.bottomLeftHandle]} />*/}
                    {/*        </PanGestureHandler>*/}

                    {/*        <PanGestureHandler*/}
                    {/*            onGestureEvent={(event) => onResize(event, "bottom-right")}>*/}
                    {/*            <View style={[styles.resizeHandle, styles.bottomRightHandle]} />*/}
                    {/*        </PanGestureHandler>*/}

                    {/*    </View>*/}
                    {/*</PanGestureHandler>*/}


                </GestureDetector>


                <TouchableOpacity style={styles.cropButton} onPress={onCropClick}>
                    {cropping &&  <ActivityIndicator size="small" color="#000" />}
                    <Text>{cropping ? 'Cropping...' : 'Crop It'}</Text>
                </TouchableOpacity>
            </GestureHandlerRootView>

    );
}

export default CropVideo;

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
    overlay: {
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        filter:'blur(0.5px)',
    },

    cropBox: {
        position: "absolute",
        borderWidth: 5,
        borderColor: "rgba(255,255,255,0.5)",

    },
    resizeHandle: {
        position: "absolute",
        width: 20,
        height: 20,
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: 10,
    },
    topLeftHandle: { top: -10, left: -10 },
    topRightHandle: { top: -10, right: -10 },
    bottomLeftHandle: { bottom: -10, left: -10 },
    bottomRightHandle: { bottom: -10, right: -10 },

    resizeEdge: {
        position: "absolute",
        backgroundColor: "rgba(255,255,255,0.3)",
    },
    topEdge: { top: -5, left: 10, right: 10, height: 10 },
    rightEdge: { top: 10, right: -5, bottom: 10, width: 10 },
    bottomEdge: { left: 10, right: 10, bottom: -5, height: 10 },
    leftEdge: { top: 10, bottom: 10, left: -5, width: 10 },

    cropButton:{

        position:'absolute',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
        bottom:30,
        right:20,
        backgroundColor: 'white',
        paddingHorizontal:25,
        paddingVertical:15,
        borderRadius:8,
    },
});
