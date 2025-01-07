import {Dimensions} from "react-native";
import {GestureEvent, PanGestureHandlerEventPayload} from "react-native-gesture-handler";

export interface CropBox {
    width: number;
    height: number;
    x: number;
    y: number;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const SCALING_FACTOR = 0.1; // Adjust this value to make gestures smoother


export const handleResizeGesture = (
    event:  GestureEvent<PanGestureHandlerEventPayload>,
    direction: string,
    cropBox: CropBox,
    maxWidth: number,
    maxHeight: number
): CropBox => {

    const translationX = event.nativeEvent.translationX * SCALING_FACTOR;
    const translationY = event.nativeEvent.translationY * SCALING_FACTOR;

    let { width, height, x, y } = cropBox;

    if (direction.includes("right")) {
        width = Math.min(maxWidth - x, Math.max(100, width + translationX));
    }
    if (direction.includes("bottom")) {
        height = Math.min(maxHeight - y, Math.max(100, height + translationY));
    }
    if (direction.includes("left")) {
        const newWidth = width - translationX;
        if (newWidth >= 100) {
            width = newWidth;
            x = Math.max(0, Math.min(x + translationX, maxWidth));
        }
    }
    if (direction.includes("top")) {
        const newHeight = height - translationY;
        if (newHeight >= 100) {
            height = newHeight;
            y = Math.max(0, Math.min(y + translationY, maxHeight));
        }
    }

    return { width, height, x, y };
};

export const calculateContainerDimensions = (videoWidth:number, videoHeight:number) => {
    const videoAspectRatio = videoWidth / videoHeight;

    // Assuming we want the container to take up the full width of the screen
    let containerWidth = screenWidth; // Full screen width
    let containerHeight = containerWidth / videoAspectRatio; // Maintain aspect ratio

    // Ensure container height doesn't exceed screen height
    if (containerHeight > screenHeight) {
        containerHeight = screenHeight; // Limit height to screen height
        containerWidth = containerHeight * videoAspectRatio; // Adjust width to maintain aspect ratio
    }

    return { width: containerWidth, height: containerHeight };
};

export  const scaleDimensionOnGesture = (event: GestureEvent<PanGestureHandlerEventPayload>, containerWidth:number, containerHeight:number, cropBox:CropBox)=> {
    const { translationX, translationY } = event.nativeEvent;
    return ({
        ...cropBox,
        x: Math.max(
            0,
            Math.min(containerWidth - cropBox.width, cropBox.x + translationX * SCALING_FACTOR)
        ),
        y: Math.max(
            0,
            Math.min(containerHeight - cropBox.height, cropBox.y + translationY * SCALING_FACTOR)
        ),
    });
};