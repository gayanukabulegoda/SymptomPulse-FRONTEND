import React, {useEffect} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {fetchPendingNotifications} from '../../store/slices/notificationSlice';
import {NotificationCard} from './NotificationCard';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Ionicons} from "@expo/vector-icons";
/**
 * @file NotificationList.tsx
 * @description The notification list component for the notifications screen.
 * @exports NotificationList
 */
export const NotificationList = () => {
    const dispatch = useAppDispatch();
    const {notifications, loading, error} = useAppSelector(
        (state) => state.notifications
    );

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = () => {
        dispatch(fetchPendingNotifications());
    };

    if (error) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-base text-red-500 text-center">{error}</Text>
            </View>
        );
    }

    return (
        <Animated.View entering={FadeIn.duration(500)} className="flex-1 bg-gray-50">
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <NotificationCard
                        title={item.title}
                        body={item.body}
                        scheduledAt={item.scheduledAt}
                    />
                )}
                contentContainerStyle={{flexGrow: 1, padding: 16}}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadNotifications}
                        tintColor="#4F46E5"
                    />
                }
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center py-8">
                        <Ionicons name="notifications-off-outline" size={48} color="#9CA3AF"/>
                        <Text className="mt-4 text-base text-gray-500 text-center">
                            No notifications yet
                        </Text>
                    </View>
                }
            />
        </Animated.View>
    );
};