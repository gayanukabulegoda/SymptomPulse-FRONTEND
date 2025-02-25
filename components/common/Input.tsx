import React from 'react';
import {View, TextInput, Text, Platform} from 'react-native';
import {twMerge} from 'tailwind-merge';

interface InputProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    error?: string;
    className?: string;
    type?: string;
}

export const Input = ({
                          label,
                          value,
                          onChangeText,
                          placeholder,
                          secureTextEntry = false,
                          keyboardType = 'default',
                          error,
                          className = '',
                          type = 'text',
                      }: InputProps) => {
    const inputProps = Platform.OS === 'web'
        ? {type}
        : {};

    return (
        <View className={twMerge('mb-4', className)}>
            {label && <Text className="text-gray-700 font-medium mb-1">{label}</Text>}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                className={twMerge(
                    'w-full px-4 py-3 rounded-lg border',
                    error ? 'border-red-500' : 'border-gray-300',
                    'bg-white'
                )}
                {...inputProps}
            />
            {error && (
                <Text className="text-red-500 text-sm mt-1">{error}</Text>
            )}
        </View>
    );
};