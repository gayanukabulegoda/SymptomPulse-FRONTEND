import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import {useRouter} from 'expo-router';
import {useAppDispatch} from '../../store';
import {addMedication} from '../../store/slices/medicationSlice';
import {Input} from '../../components/common/Input';
import {Button} from '../../components/common/Button';
import {Picker} from '@react-native-picker/picker';
import Animated, {FadeInDown} from 'react-native-reanimated';

export default function AddMedicationScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [schedule, setSchedule] = useState('DAILY');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [error, setError] = useState<string | null>(null);
    const [startDateError, setStartDateError] = useState<string | null>(null);
    const [endDateError, setEndDateError] = useState<string | null>(null);

    const validateDate = (dateStr: string): Date | null => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return null;
        }
        return date;
    };

    const handleStartDateChange = (text: string) => {
        const date = validateDate(text);
        if (date) {
            setStartDate(date);
            setStartDateError(null);
        } else {
            setStartDateError('Please enter a valid date (YYYY-MM-DD)');
        }
    };

    const handleEndDateChange = (text: string) => {
        if (!text) {
            setEndDate(undefined);
            setEndDateError(null);
            return;
        }

        const date = validateDate(text);
        if (date) {
            if (date < startDate) {
                setEndDateError('End date must be after start date');
            } else {
                setEndDate(date);
                setEndDateError(null);
            }
        } else {
            setEndDateError('Please enter a valid date (YYYY-MM-DD)');
        }
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async () => {
        try {
            if (!name.trim()) {
                setError('Medication name is required');
                return;
            }

            if (startDateError || endDateError) {
                setError('Please fix the date errors before submitting');
                return;
            }

            await dispatch(addMedication({
                name,
                dosage,
                schedule,
                startDate,
                endDate,
            })).unwrap();

            router.back();
        } catch (err) {
            setError('Failed to add medication');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={styles.content}
            >
                <Text style={styles.title}>Add New Medication</Text>

                {error && (
                    <Text style={styles.error}>{error}</Text>
                )}

                <Input
                    label="Medication Name"
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter medication name"
                />

                <Input
                    label="Dosage"
                    value={dosage}
                    onChangeText={setDosage}
                    placeholder="Enter dosage (optional)"
                />

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Schedule</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={schedule}
                            onValueChange={(value) => setSchedule(value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Once Daily" value="DAILY"/>
                            <Picker.Item label="Twice Daily" value="TWICE_DAILY"/>
                        </Picker>
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Start Date</Text>
                    <Input
                        value={formatDate(startDate)}
                        onChangeText={handleStartDateChange}
                        placeholder="YYYY-MM-DD"
                        type={Platform.OS === 'web' ? 'date' : 'text'}
                        error={startDateError ?? undefined}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>End Date (Optional)</Text>
                    <Input
                        value={endDate ? formatDate(endDate) : ''}
                        onChangeText={handleEndDateChange}
                        placeholder="YYYY-MM-DD"
                        type={Platform.OS === 'web' ? 'date' : 'text'}
                        error={endDateError ?? undefined}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => router.back()}
                        variant="outline"
                        className="flex-1 mr-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        onPress={handleSubmit}
                        className="flex-1 ml-2"
                    >
                        Add Medication
                    </Button>
                </View>
            </Animated.View>
        </ScrollView>
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
        marginBottom: 24,
    },
    error: {
        color: '#EF4444',
        marginBottom: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 24,
    },
});