import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Animated, {FadeInRight} from 'react-native-reanimated';
/**
 * @file NotificationCard.tsx
 * @description The notification card component for the notification list.
 * @exports NotificationCard
 */
interface NotificationCardProps {
    title: string;
    body: string;
    scheduledAt: string;
    onPress?: () => void;
}

export const NotificationCard = ({
                                     title,
                                     body,
                                     scheduledAt,
                                     onPress,
                                 }: NotificationCardProps) => {
    const formattedDate = new Date(scheduledAt).toLocaleString();

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <Animated.View
                entering={FadeInRight.springify()}
                className="bg-white rounded-xl p-4 mb-3 flex-row items-center shadow-md border border-gray-100"
            >
                <View className="w-10 h-10 rounded-full bg-indigo-50 justify-center items-center mr-3">
                    <Ionicons name="notifications" size={24} color="#4F46E5"/>
                </View>
                <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800 mb-1">
                        {title}
                    </Text>
                    <Text className="text-sm text-gray-500 mb-2">{body}</Text>
                    <Text className="text-xs text-gray-400">{formattedDate}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};