import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
/**
 * @file AddMedicationButton.tsx
 * @description The add medication button component for the add medication screen.
 * @exports AddMedicationButton
 */
export const AddMedicationButton = () => {
    const router = useRouter();

    return (
        <TouchableOpacity
            className="absolute right-4 bottom-4 w-14 h-14 rounded-full bg-indigo-600 justify-center items-center shadow-lg"
            onPress={() => router.push('/medications/add')}
        >
            <Ionicons name="add" size={24} color="white"/>
        </TouchableOpacity>
    );
};