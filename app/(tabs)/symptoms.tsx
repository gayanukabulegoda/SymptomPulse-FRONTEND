import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {logSymptoms, fetchSymptomHistory} from '../../store/slices/symptomSlice';
import {SymptomSelector} from '../../components/symptoms/SymptomSelector';
import {SymptomHistory} from '../../components/symptoms/SymptomHistory';
import Animated, {FadeInDown} from 'react-native-reanimated';
/**
 * @file symptoms.tsx
 * @description Symptoms screen component for user to log symptoms and view history.
 * @exports SymptomsScreen
 */
export default function SymptomsScreen() {
    const dispatch = useAppDispatch();
    const {loading, error} = useAppSelector((state) => state.symptoms);

    useEffect(() => {
        loadInitialHistory();
    }, []);

    const loadInitialHistory = () => {
        dispatch(fetchSymptomHistory({page: 1, limit: 10}));
    };

    const handleSymptomSubmit = async (selectedSymptoms: string[]) => {
        if (selectedSymptoms.length > 0) {
            await dispatch(logSymptoms(selectedSymptoms));
        }
    };

    return (
        <View className="flex-1 bg-gray-50">
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="p-4 bg-white border-b border-b-gray-200"
            >
                <Text className="text-2xl font-bold text-gray-800 mb-2">
                    Track Your Symptoms
                </Text>
                <Text className="text-base text-gray-500 mb-4">
                    Select your symptoms to get potential conditions and track your health
                </Text>

                {error && (
                    <Text className="text-red-500 mb-4">{error}</Text>
                )}

                <SymptomSelector onSubmit={handleSymptomSubmit} loading={loading}/>
            </Animated.View>

            <View className="flex-1 p-4">
                <Text className="text-xl font-semibold text-gray-800 mb-4">
                    Symptom History
                </Text>
                <SymptomHistory/>
            </View>
        </View>
    );
}