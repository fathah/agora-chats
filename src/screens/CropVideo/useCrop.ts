import { useEffect, useMemo, useState, useCallback } from 'react';
import { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import type { MutableRefObject } from 'react';

export type CropProps = {
    x: number;
    y: number;
    scale: number;
};

const clamp = (val:number, min:number, max:number) =>{
    return Math.min(Math.max(val, min), max);
}

export const calculateCoordiatesFromLeftTopCorner = (
    offsetX: number,
    offsetY: number,
    scale: number,
    width: number,
    height: number
): Omit<CropProps, 'scale'> => {
    const coordinateX = ((scale - 1) * width) / 2 - offsetX;
    const coordinateY = ((scale - 1) * height) / 2 - offsetY;
    return { x: coordinateX, y: coordinateY };
};

const setCropProps = (
    cropPropsRef: MutableRefObject<CropProps>,
    offsetX: number,
    offsetY: number,
    scale: number,
    width: number,
    height: number
): void => {
    const newCoordinates = calculateCoordiatesFromLeftTopCorner(offsetX, offsetY, scale, width, height);
    cropPropsRef.current = { scale, ...newCoordinates };
};

type Props = {
    cropPropsRef: MutableRefObject<CropProps>;
    width: number;
    height: number;
};

export const useCrop = ({ cropPropsRef, width, height }: Props) => {

    const currentPosition = useSharedValue({ x: 0, y: 0 });
    const offset = useSharedValue({ x: 0, y: 0 });
    const currentScale = useSharedValue(1);
    const scale = useSharedValue(1);

    const [calculationCounter, setCalculationCountere] = useState<number>(0);

    useEffect(() => {
        setCropProps(cropPropsRef, offset.value.x, offset.value.y, scale.value, width, height);
    }, [calculationCounter]);

    const incrementCalculationCounter = useCallback(
        () => setCalculationCountere((prev: number) => prev + 1),
        []
    );

    const pan = useMemo(
        () =>
            Gesture.Pan()
                .minPointers(1)
                .onChange((event) => {
                    offset.value = {
                        x: clamp(
                            event.translationX + currentPosition.value.x,
                            (-1 * ((scale.value - 1) * width)) / 2,
                            ((scale.value - 1) * width) / 2
                        ),
                        y: clamp(
                            event.translationY + currentPosition.value.y,
                            (-1 *((scale.value - 1) * height)) / 2,
                            ((scale.value - 1) * height) / 2
                        ),
                    };
                })
                .onEnd((event) => {
                    currentPosition.value = {
                        x: offset.value.x,
                        y: offset.value.y,
                    };
                    runOnJS(incrementCalculationCounter)();
                }),
        []
    );
    const pinch = useMemo(
        () =>
            Gesture.Pinch()
                .onChange((event) => {
                    offset.value = {
                        x: clamp(
                            offset.value.x,
                            (-1 * ((scale.value - 1) * width)) / 2,
                            ((scale.value - 1) * height) / 2
                        ),
                        y: clamp(
                            offset.value.y,
                            (-1 *((scale.value - 1) * height)) / 2,
                            ((scale.value - 1) * height) / 2
                        ),
                    };
                    scale.value = clamp(currentScale.value * event.scale, 1, maxZoomScale);
                })
                .onEnd((event) => {
                    currentPosition.value = {
                        x: offset.value.x,
                        y: offset.value.y,
                    };
                    currentScale.value = scale.value;
                    runOnJS(incrementCalculationCounter)();
                }),
        []
    );

    const gesture = Gesture.Simultaneous(pan, pinch);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
                { scale: scale.value },
            ],
        };
    });

    return { gesture, animatedStyle };
};
