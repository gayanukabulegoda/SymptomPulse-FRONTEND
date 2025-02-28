import React from 'react';
import {View, Text} from 'react-native';
import {NotificationList} from '../../components/notifications/NotificationList';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {Ionicons} from '@expo/vector-icons';
/**
 * @file notifications.tsx
 * @description Notifications screen component for user to view health reminders.
 * @exports NotificationsScreen
 */
export default function NotificationsScreen() {
    return (
        <View className="flex-1 bg-gray-50">
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="bg-white shadow-sm border-b border-gray-200"
            >
                <View className="pt-12 px-6 pb-6">
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="notifications-outline" size={24} color="#4F46E5"/>
                        <Text className="text-2xl font-bold text-gray-900 ml-2">
                            Notifications
                        </Text>
                    </View>
                    <Text className="text-gray-600">
                        Stay updated with your health reminders
                    </Text>
                </View>
            </Animated.View>

            <NotificationList/>
        </View>
    );
}