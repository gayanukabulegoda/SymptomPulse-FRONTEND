import React from 'react';
import {TouchableOpacity, Text, TouchableOpacityProps, TextProps} from 'react-native';
import {useAppDispatch} from '../../store';
import {logout} from '../../store/slices/authSlice';
import {Ionicons} from '@expo/vector-icons';

interface LogoutButtonProps {
    className?: TouchableOpacityProps['className'];
    textClass?: TextProps['className'];
}

export const LogoutButton = ({className, textClass}: LogoutButtonProps) => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <TouchableOpacity
            onPress={handleLogout}
            className={className || "flex-row items-center px-4 py-3 bg-white/10 rounded-full"}
        >
            <Ionicons name="log-out-outline" size={20} color="white"/>
            <Text className={textClass || "ml-2 text-white font-medium"}>Logout</Text>
        </TouchableOpacity>
    );
};