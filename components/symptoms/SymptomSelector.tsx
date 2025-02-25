import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from '../common/Button';
import Animated, {FadeInRight} from 'react-native-reanimated';

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

    const toggleSymptom = (symptom: string) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.symptomsGrid}>
                {COMMON_SYMPTOMS.map((symptom, index) => {
                    const isSelected = selectedSymptoms.includes(symptom);
                    return (
                        <Animated.View
                            key={`${symptom}-${index}`}
                            entering={FadeInRight.delay(index * 100)}
                            style={styles.symptomWrapper}
                        >
                            <TouchableOpacity
                                onPress={() => toggleSymptom(symptom)}
                                style={[
                                    styles.symptomButton,
                                    isSelected && styles.symptomButtonSelected,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.symptomText,
                                        isSelected && styles.symptomTextSelected,
                                    ]}
                                >
                                    {symptom}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
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

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    symptomsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    symptomWrapper: {
        marginBottom: 8,
    },
    symptomButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: 'white',
    },
    symptomButtonSelected: {
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
    },
    symptomText: {
        color: '#374151',
        fontSize: 14,
    },
    symptomTextSelected: {
        color: 'white',
    },
});