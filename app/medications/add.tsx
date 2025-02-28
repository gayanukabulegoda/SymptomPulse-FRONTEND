import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useRouter} from 'expo-router';
import {useAppDispatch} from '../../store/store';
import {addMedication} from '../../store/slices/medicationSlice';
import {Input} from '../../components/common/Input';
import {Button} from '../../components/common/Button';
import {Picker} from '@react-native-picker/picker';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {ChevronDown, XCircle} from 'lucide-react-native';
import {format} from 'date-fns';
import {CustomDatePicker} from '../../components/common/CustomDatePicker';
/**
 * @file add.tsx
 * @description Add medication screen component for user to add a new medication.
 * @exports AddMedicationScreen
 */
export default function AddMedicationScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [schedule, setSchedule] = useState('DAILY');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [error, setError] = useState<string | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [editingStartDate, setEditingStartDate] = useState(false);

    const handleDateChange = (date: Date) => {
        if (editingStartDate) {
            setStartDate(date);
            if (endDate && date > endDate) {
                setEndDate(undefined);
            }
        } else {
            if (date < startDate) {
                setError('End date must be after start date');
                return;
            }
            setEndDate(date);
        }
        setError(null);
    };

    const handleSubmit = async () => {
        try {
            if (!name.trim()) {
                setError('Medication name is required');
                return;
            }

            await dispatch(
                addMedication({
                    name,
                    dosage,
                    schedule,
                    startDate,
                    endDate,
                })
            ).unwrap();

            router.back();
        } catch (err) {
            setError('Failed to add medication');
        }
    };

    return (
        <Animated.ScrollView
            entering={FadeInDown.duration(1000).springify()}
            className="flex-1 bg-slate-50"
        >
            <View className="p-6">
                <Text className="text-3xl font-bold text-slate-900 mb-8">
                    Add New Medication
                </Text>

                {error && (
                    <View className="bg-red-100 p-4 rounded-lg mb-6 flex-row items-center">
                        <XCircle size={20} color="#dc2626" className="mr-2"/>
                        <Text className="text-red-600 font-medium">{error}</Text>
                    </View>
                )}

                <View className="space-y-6">
                    <Input
                        label="Medication Name"
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter medication name"
                        className="bg-white shadow-sm"
                    />

                    <Input
                        label="Dosage"
                        value={dosage}
                        onChangeText={setDosage}
                        placeholder="Enter dosage (optional)"
                        className="bg-white shadow-sm"
                    />

                    <View>
                        <Text className="text-slate-700 font-medium mb-1">Schedule</Text>
                        <View className="bg-white rounded-lg border border-slate-200 shadow-sm">
                            <Picker
                                selectedValue={schedule}
                                onValueChange={(value) => setSchedule(value)}
                                dropdownIconColor="#64748b"
                            >
                                <Picker.Item label="Once Daily" value="DAILY"/>
                                <Picker.Item label="Twice Daily" value="TWICE_DAILY"/>
                                <Picker.Item label="Custom" value="WEEKLY"/>
                                <Picker.Item label="As Needed" value="AS_NEEDED"/>
                            </Picker>
                        </View>
                    </View>

                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-700 font-medium mb-1 mt-4">
                                Start Date
                            </Text>
                            <Pressable
                                onPress={() => {
                                    setEditingStartDate(true);
                                    setShowDatePicker(true);
                                }}
                                className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-row justify-between items-center"
                            >
                                <Text className="text-slate-800">
                                    {format(startDate, 'dd MMM yyyy')}
                                </Text>
                                <ChevronDown size={20} color="#64748b"/>
                            </Pressable>
                        </View>

                        <View>
                            <Text className="text-slate-700 font-medium mb-1 mt-4">
                                End Date (Optional)
                            </Text>
                            <Pressable
                                onPress={() => {
                                    setEditingStartDate(false);
                                    setShowDatePicker(true);
                                }}
                                className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-row justify-between items-center"
                            >
                                <Text className="text-slate-800">
                                    {endDate ? format(endDate, 'dd MMM yyyy') : 'Select end date'}
                                </Text>
                                <ChevronDown size={20} color="#64748b"/>
                            </Pressable>
                        </View>
                    </View>

                    <CustomDatePicker
                        visible={showDatePicker}
                        date={editingStartDate ? startDate : endDate || new Date()}
                        onDateChange={handleDateChange}
                        onClose={() => setShowDatePicker(false)}
                        minimumDate={editingStartDate ? undefined : startDate}
                    />

                    <View className="flex-row space-x-0 mt-8">
                        <Button
                            onPress={() => router.back()}
                            variant="outline"
                            className="flex-1 bg-white border-slate-200 shadow-sm mr-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={handleSubmit}
                            className="flex-1 bg-primary shadow-lg shadow-blue-100"
                        >
                            Add Medication
                        </Button>
                    </View>
                </View>
            </View>
        </Animated.ScrollView>
    );
}