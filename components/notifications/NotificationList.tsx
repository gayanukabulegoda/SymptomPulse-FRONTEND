import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store';
import {fetchPendingNotifications} from '../../store/slices/notificationSlice';
import {NotificationCard} from './NotificationCard';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Ionicons} from "@expo/vector-icons";

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
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <Animated.View
            entering={FadeIn.duration(500)}
            style={styles.container}
        >
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
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadNotifications}
                        tintColor="#4F46E5"
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={48} color="#9CA3AF"/>
                        <Text style={styles.emptyText}>No notifications yet</Text>
                    </View>
                }
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    listContent: {
        padding: 16,
        flexGrow: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    errorText: {
        fontSize: 16,
        color: '#EF4444',
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 32,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
});