import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export const CollapsableContainer = ({ expanded, children, viewKey, style, }) => {

    const height = useSharedValue(0);

    const derivedHeight = useDerivedValue(() =>
        withTiming(height.value)
    );
    const bodyStyle = useAnimatedStyle(() => ({
        height: expanded ? withTiming(derivedHeight.value) : withTiming(0),
    }));

    const onLayout = (event) => {
        height.value = event.nativeEvent.layout.height;

        if (height.value > 0 && height !== height.value) {
            height.value
        }
    };

    return (
        <Animated.View
            key={`accordionItem_${viewKey}`}
            style={[{overflow: 'hidden', width: '100%'}, bodyStyle, style]}>
            <View
                onLayout={onLayout}
                style={{position: "absolute"}}>
                {children}
            </View>
        </Animated.View>
    );
};