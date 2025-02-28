import React from 'react';
import {View, Text} from 'react-native';
import {MedicationList} from '../../components/medications/MedicationList';
import {AddMedicationButton} from '../../components/medications/AddMedicationButton';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {Ionicons} from '@expo/vector-icons';
/**
 * @file medications.tsx
 * @description Medications screen component for user to view and manage their medications.
 * @exports MedicationsScreen
 */
export default function MedicationsScreen() {
    return (
        <View className="flex-1 bg-gray-50">
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="bg-white shadow-sm border-b border-gray-200"
            >
                <View className="pt-12 px-6 pb-6">
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="medical-outline" size={24} color="#4F46E5"/>
                        <Text className="text-2xl font-bold text-gray-900 ml-2">
                            Medications
                        </Text>
                    </View>
                    <Text className="text-gray-600">
                        Track and manage your medications schedule
                    </Text>
                </View>
            </Animated.View>

            <MedicationList/>
            <AddMedicationButton/>
        </View>
    );
}