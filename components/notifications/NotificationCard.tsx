import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Animated, {FadeInRight} from 'react-native-reanimated';

interface NotificationCardProps {
    title: string;
    body: string;
    scheduledAt: string;
    onPress?: () => void;
}

export const NotificationCard = ({title, body, scheduledAt, onPress}: NotificationCardProps) => {
    const formattedDate = new Date(scheduledAt).toLocaleString();

    return (
        <TouchableOpacity onPress={onPress}>
            <Animated.View
                entering={FadeInRight.springify()}
                style={styles.card}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name="notifications" size={24} color="#4F46E5"/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.body}>{body}</Text>
                    <Text style={styles.time}>{formattedDate}</Text>
                </View>

                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#9CA3AF"
                    style={styles.chevron}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    body: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 8,
    },
    time: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    chevron: {
        marginLeft: 8,
    },
});