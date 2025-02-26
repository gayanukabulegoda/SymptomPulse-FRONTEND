import React from 'react';
import {View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export const MedicationCard = ({medication}: { medication: any }) => {
    const getScheduleText = (schedule: string) => {
        switch (schedule) {
            case 'DAILY':
                return 'Once daily';
            case 'TWICE_DAILY':
                return 'Twice daily';
            case 'WEEKLY':
                return 'Once weekly';
            case 'AS_NEEDED':
                return 'As needed';
            default:
                return schedule;
        }
    };

    return (
        <View className="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-lg w-full max-w-md mx-auto">
            {/* Header */}
            <View className="mb-4">
                <Text className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {medication.name}
                </Text>
                <Text className="text-sm text-gray-600">
                    {getScheduleText(medication.schedule)}
                </Text>
            </View>

            {/* Divider */}
            <View className="border-t border-gray-200 pt-4">
                {/* Dosage */}
                {medication.dosage && (
                    <View className="flex-row items-center mb-3">
                        <Ionicons name="medical" size={18} color="#4F46E5"/>
                        <Text className="ml-2 text-base text-gray-700">
                            {medication.dosage}
                        </Text>
                    </View>
                )}

                {/* Start Date */}
                <View className="flex-row items-center mb-3">
                    <Ionicons name="calendar" size={18} color="#4F46E5"/>
                    <Text className="ml-2 text-base text-gray-700">
                        Started {new Date(medication.startDate).toLocaleDateString()}
                    </Text>
                </View>

                {/* End Date */}
                {medication.endDate && (
                    <View className="flex-row items-center">
                        <Ionicons name="calendar-outline" size={18} color="#4F46E5"/>
                        <Text className="ml-2 text-base text-gray-700">
                            Until {new Date(medication.endDate).toLocaleDateString()}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};
