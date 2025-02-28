import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {fetchMedications} from '../../store/slices/medicationSlice';
import {MedicationCard} from './MedicationCard';
import Animated, {FadeInUp} from 'react-native-reanimated';
/**
 * @file MedicationList.tsx
 * @description The medication list component for the medications screen.
 * @exports MedicationList
 */
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
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-base text-gray-500">Loading medications...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-base text-red-500 text-center">{error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={medications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            className="p-4 flex-grow"
            ListEmptyComponent={
                <View className="flex-1 justify-center items-center p-4">
                    <Text className="text-base text-gray-500 italic">No medications added yet</Text>
                </View>
            }
        />
    );
};