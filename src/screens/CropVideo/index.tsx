import 'react-native-gesture-handler';
import React, {useMemo} from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Video from "react-native-video";
import {useNavigation, useRoute} from "@react-navigation/native";
import {calculateContainerDimensions} from "./utils.ts";





export default function CropVideo() {

    const route  = useRoute();
    const {video, width, height, fileName} = route.params;



    const pressed = useSharedValue<boolean>(false);

    const offset = useSharedValue({x:0, y:0});
    const size = useSharedValue({width: containerWidth, height: containerHeight});
    const start = useSharedValue(({ x:0, y: 0}));



    const relativeVal = useMemo(()=> calculateContainerDimensions(width, height),[width, height]);
    const containerWidth = relativeVal.width;
    const containerHeight = relativeVal.height;

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offset.value.x},
            { translateY: offset.value.y},
            // { scale: withTiming(pressed.value ? 1.2 : 1) },
        ],
        height: containerHeight,
        width: containerWidth,
    }));


    const scale = Gesture.Pinch().onUpdate((event)=>{
        size.value = {
            width: size.value.width * event.scale,
            height: size.value.height * event.scale,
        };
    });

    const pan = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            const newX = Math.min(
                Math.max(0, start.value.x + event.translationX),
                0
            );

            const newY = Math.min(
                Math.max(0, start.value.y + event.translationY),
                0
            );

            // Update offset with calculated values
            offset.value = { x: newX, y: newY };


        })
        .onEnd(() => {
            start.value = {x: offset.value.x, y: offset.value.y};
        })
    .onFinalize(() => {
        // offset.value = withSpring({
        //     x: 0,
        //     y: 0,
        // });
        pressed.value = false;
    });

    const concat = Gesture.Simultaneous(pan, scale);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={[styles.container,{ width:containerWidth,
                height:containerHeight}]}>
                <Video
                source={{
                    uri: video
                }}
                style={{
                   width:"100%",
                   height:"100%",
                    position:"absolute"
                }}
                />
                <GestureDetector gesture={concat}>
                    <Animated.View style={[styles.cropBox, animatedStyles]} />
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',

    },
    cropBox: {
        transformOrigin:'center',
        borderColor: '#b58df1',
        borderWidth: 5,
        position: 'absolute',

    },
});