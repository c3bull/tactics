import React, {useState} from "react";
import {View, Dimensions} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export const CollapsableContainer = ({
                                         children,
                                         expanded,
                                     }) => {
    const [height, setHeight] = useState(0);
    const animatedHeight = useSharedValue(0);
    const width = Dimensions.get('window').width;
    const onLayout = (event) => {
        const onLayoutHeight = event.nativeEvent.layout.height;

        if (onLayoutHeight > 0 && height !== onLayoutHeight) {
            setHeight(onLayoutHeight);
        }
    };

    const collapsableStyle = useAnimatedStyle(() => {
        animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

        return {
            height: animatedHeight.value,
        };
    }, [expanded]);

    return (
        <Animated.View style={[collapsableStyle, {overflow: 'hidden', width: 360}]}>
            <View style={{position: "absolute"}} onLayout={onLayout}>
                {children}
            </View>
        </Animated.View>
    );
};