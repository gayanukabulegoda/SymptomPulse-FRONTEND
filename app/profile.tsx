import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppSelector} from '../store';
import Animated, {FadeInDown} from 'react-native-reanimated';

export default function ProfileScreen() {
    const {user} = useAppSelector((state) => state.auth);

    return (
        <View style={styles.container}>
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={styles.content}
            >
                <Text style={styles.title}>Profile</Text>
                <View style={styles.card}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{user?.name || 'N/A'}</Text>

                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{user?.email || 'N/A'}</Text>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
        marginTop: 12,
    },
    value: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '500',
    },
});