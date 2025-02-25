import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store';
import {fetchMedications} from '../../store/slices/medicationSlice';
import {MedicationCard} from './MedicationCard';
import Animated, {FadeInUp} from 'react-native-reanimated';

export const MedicationList = () => {
    const dispatch = useAppDispatch();
    const {medications, loading, error} = useAppSelector((state) => state.medications);

    useEffect(() => {
        dispatch(fetchMedications());
    }, []);

    const renderItem = ({item, index}: { item: any; index: number }) => (
        <Animated.View entering={FadeInUp.delay(index * 100)}>
            <MedicationCard medication={item}/>
        </Animated.View>
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.loadingText}>Loading medications...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={medications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
                <View style={styles.centerContainer}>
                    <Text style={styles.emptyText}>No medications added yet</Text>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
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
    loadingText: {
        fontSize: 16,
        color: '#6B7280',
    },
    errorText: {
        fontSize: 16,
        color: '#EF4444',
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#6B7280',
        fontStyle: 'italic',
    },
});