import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Button} from '../common/Button';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {Ionicons} from '@expo/vector-icons';

const COMMON_SYMPTOMS = [
    'Headache',
    'Fever',
    'Cough',
    'Fatigue',
    'Nausea',
    'Dizziness',
    'Sore Throat',
    'Body Ache',
    'Shortness of Breath',
    'Chest Pain',
];

interface SymptomSelectorProps {
    onSubmit: (symptoms: string[]) => void;
    loading?: boolean;
}

export const SymptomSelector = ({onSubmit, loading}: SymptomSelectorProps) => {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [customSymptom, setCustomSymptom] = useState('');

    const toggleSymptom = (symptom: string) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
        );
    };

    const addCustomSymptom = () => {
        if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
            setSelectedSymptoms((prev) => [...prev, customSymptom.trim()]);
            setCustomSymptom('');
        }
    };

    const removeSymptom = (symptom: string) => {
        setSelectedSymptoms((prev) => prev.filter((s) => s !== symptom));
    };

    return (
        <View className="w-full space-y-6">
            {/* Selected Symptoms */}
            <View className="flex-row flex-wrap gap-2">
                {selectedSymptoms.map((symptom, index) => (
                    <Animated.View
                        key={`${symptom}-${index}`}
                        entering={FadeInRight.delay(index * 100)}
                        className="bg-primary/10 rounded-full px-4 py-2 flex-row items-center"
                    >
                        <Text className="text-primary mr-2">{symptom}</Text>
                        <TouchableOpacity onPress={() => removeSymptom(symptom)}>
                            <Ionicons name="close-circle" size={18} color="#4F46E5"/>
                        </TouchableOpacity>
                    </Animated.View>
                ))}
            </View>

            {/* Custom Symptom Input */}
            <View className="space-y-2">
                <Text className="text-gray-700 font-medium">Add Custom Symptom</Text>
                <View className="flex-row space-x-2">
                    <TextInput
                        value={customSymptom}
                        onChangeText={setCustomSymptom}
                        onSubmitEditing={addCustomSymptom}
                        placeholder="Type a symptom..."
                        className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-200"
                    />
                    <TouchableOpacity
                        onPress={addCustomSymptom}
                        disabled={!customSymptom.trim()}
                        className={`px-4 py-3 rounded-lg ${
                            customSymptom.trim() ? 'bg-primary' : 'bg-gray-200'
                        }`}
                    >
                        <Ionicons
                            name="add"
                            size={24}
                            color={customSymptom.trim() ? 'white' : '#6B7280'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Common Symptoms */}
            <View className="space-y-2">
                <Text className="text-gray-700 font-medium">Common Symptoms</Text>
                <View className="flex-row flex-wrap gap-2">
                    {COMMON_SYMPTOMS.map((symptom, index) => {
                        const isSelected = selectedSymptoms.includes(symptom);
                        return (
                            <Animated.View key={symptom} entering={FadeInRight.delay(index * 100)}>
                                <TouchableOpacity
                                    onPress={() => toggleSymptom(symptom)}
                                    className={`px-4 py-2 rounded-full border ${
                                        isSelected ? 'bg-primary border-primary' : 'bg-white border-gray-200'
                                    }`}
                                >
                                    <Text className={isSelected ? 'text-white' : 'text-gray-700'}>
                                        {symptom}
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    })}
                </View>
            </View>

            <Button
                onPress={() => onSubmit(selectedSymptoms)}
                disabled={selectedSymptoms.length === 0 || loading}
                loading={loading}
                className="mt-6"
            >
                Log Symptoms
            </Button>
        </View>
    );
};
