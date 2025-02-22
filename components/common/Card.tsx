import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';

interface CardProps {
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Card = ({title, icon, onPress}: CardProps) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{scale: withSpring(1)}],
    }));

    return (
        <AnimatedTouchable
            onPress={onPress}
            className="bg-white p-6 rounded-xl shadow-sm"
            style={animatedStyle}
        >
            <View className="items-center">
                {icon}
                <Text className="mt-3 text-gray-800 font-medium text-center">
                    {title}
                </Text>
            </View>
        </AnimatedTouchable>
    );
};