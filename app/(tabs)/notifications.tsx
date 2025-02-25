import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NotificationList} from '../../components/notifications/NotificationList';
import {Stack} from 'expo-router';

export default function NotificationsScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Notifications',
                    headerStyle: {
                        backgroundColor: '#FFFFFF',
                    },
                    headerShadowVisible: false,
                }}
            />
            <NotificationList/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
});