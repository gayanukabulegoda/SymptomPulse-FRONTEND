import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { logSymptoms, fetchSymptomHistory } from '../../store/slices/symptomSlice';
import { SymptomSelector } from '../../components/symptoms/SymptomSelector';
import { SymptomHistory } from '../../components/symptoms/SymptomHistory';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SymptomsScreen() {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.symptoms);

    useEffect(() => {
        loadInitialHistory();
    }, []);

    const loadInitialHistory = () => {
        dispatch(fetchSymptomHistory({ page: 1, limit: 10 }));
    };

    const handleSymptomSubmit = async (selectedSymptoms: string[]) => {
        if (selectedSymptoms.length > 0) {
            await dispatch(logSymptoms(selectedSymptoms));
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={styles.header}
            >
                <Text style={styles.title}>Track Your Symptoms</Text>
                <Text style={styles.subtitle}>
                    Select your symptoms to get potential conditions and track your health
                </Text>

                {error && (
                    <Text style={styles.error}>{error}</Text>
                )}

                <SymptomSelector onSubmit={handleSymptomSubmit} loading={loading} />
            </Animated.View>

            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Symptom History</Text>
                <SymptomHistory />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 16,
    },
    error: {
        color: '#EF4444',
        marginBottom: 16,
    },
    historyContainer: {
        flex: 1,
        padding: 16,
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
});