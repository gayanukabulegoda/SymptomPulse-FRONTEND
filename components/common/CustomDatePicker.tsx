import React, {useEffect, useState} from "react";
import {format} from "date-fns";
import {Modal, Pressable, Text, View} from "react-native";
import {XCircle} from "lucide-react-native";
import {Picker} from "@react-native-picker/picker";
import {Button} from "./Button";

export const CustomDatePicker = ({
                              visible,
                              date,
                              onDateChange,
                              onClose,
                          }: {
    visible: boolean;
    date: Date;
    onDateChange: (date: Date) => void;
    onClose: () => void;
    maximumDate?: Date;
    minimumDate?: Date;
}) => {
    const [selectedDate, setSelectedDate] = useState(date);
    const [days, setDays] = useState<number[]>([]);
    const [months] = useState(
        Array.from({length: 12}, (_, i) => ({
            value: i + 1,
            label: format(new Date(0, i), 'MMM'),
        }))
    );
    const [years] = useState(
        Array.from({length: 100}, (_, i) => new Date().getFullYear() - 50 + i)
    );

    useEffect(() => {
        const updateDays = () => {
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            setDays(Array.from({length: daysInMonth}, (_, i) => i + 1));
        };

        updateDays();
    }, [selectedDate.getMonth(), selectedDate.getFullYear()]);

    const handleConfirm = () => {
        onDateChange(selectedDate);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View className="flex-1 bg-black/50 justify-center p-4">
                <View className="bg-white rounded-xl p-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-semibold text-gray-900">
                            Select Date
                        </Text>
                        <Pressable onPress={onClose}>
                            <XCircle size={24} color="#6b7280"/>
                        </Pressable>
                    </View>

                    <View className="flex-row justify-between">
                        <View className="flex-1">
                            <Text className="text-gray-500 text-sm mb-2">Day</Text>
                            <Picker
                                selectedValue={selectedDate.getDate()}
                                onValueChange={(itemValue) =>
                                    setSelectedDate(
                                        new Date(
                                            selectedDate.setDate(itemValue)
                                        )
                                    )
                                }>
                                {days.map((day) => (
                                    <Picker.Item key={day} label={String(day)} value={day}/>
                                ))}
                            </Picker>
                        </View>

                        <View className="flex-1">
                            <Text className="text-gray-500 text-sm mb-2">Month</Text>
                            <Picker
                                selectedValue={selectedDate.getMonth() + 1}
                                onValueChange={(itemValue) =>
                                    setSelectedDate(
                                        new Date(
                                            selectedDate.setMonth(itemValue - 1)
                                        )
                                    )
                                }>
                                {months.map((month) => (
                                    <Picker.Item
                                        key={month.value}
                                        label={month.label}
                                        value={month.value}
                                    />
                                ))}
                            </Picker>
                        </View>

                        <View className="flex-1">
                            <Text className="text-gray-500 text-sm mb-2">Year</Text>
                            <Picker
                                selectedValue={selectedDate.getFullYear()}
                                onValueChange={(itemValue) =>
                                    setSelectedDate(
                                        new Date(
                                            selectedDate.setFullYear(itemValue)
                                        )
                                    )
                                }>
                                {years.map((year) => (
                                    <Picker.Item key={year} label={String(year)} value={year}/>
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <Button onPress={handleConfirm} className="mt-4">
                        Confirm Date
                    </Button>
                </View>
            </View>
        </Modal>
    );
};