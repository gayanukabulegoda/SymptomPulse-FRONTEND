import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
/**
 * @file Card.tsx
 * @description Common card component for the application.
 * @exports Card
 */
interface CardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onPress: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Card = ({title, description, icon, onPress}: CardProps) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{scale: withSpring(1)}],
    }));

    return (
        <AnimatedTouchable
            onPress={onPress}
            style={[styles.container, animatedStyle]}
        >
            <View style={styles.content}>
                {icon}
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </AnimatedTouchable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        textAlign: 'center',
    },
    description: {
        marginTop: 4,
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },
});