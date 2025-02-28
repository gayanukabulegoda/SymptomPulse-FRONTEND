import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {twMerge} from 'tailwind-merge';
/**
 * @file Button.tsx
 * @description Common button component for the application.
 * @exports Button
 */
interface ButtonProps {
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
}

export const Button = ({
                           onPress,
                           loading = false,
                           disabled = false,
                           children,
                           variant = 'primary',
                           className = '',
                       }: ButtonProps) => {
    const baseStyles = 'px-6 py-3 rounded-lg flex-row items-center justify-center';
    const variantStyles = {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        outline: 'border-2 border-primary',
    };

    const textStyles = {
        primary: 'text-white font-semibold text-center',
        secondary: 'text-white font-semibold text-center',
        outline: 'text-primary font-semibold text-center',
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            className={twMerge(
                baseStyles,
                variantStyles[variant],
                disabled ? 'opacity-50' : '',
                className
            )}
        >
            <Text className={textStyles[variant]}>
                {loading ? 'Loading...' : children}
            </Text>
        </TouchableOpacity>
    );
}