import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useAppDispatch} from '../../store';
import {logout} from '../../store/slices/authSlice';
import {Ionicons} from '@expo/vector-icons';

export const LogoutButton = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center px-4 py-3 mx-2 rounded-lg hover:bg-red-50"
        >
            <Ionicons name="log-out-outline" size={24} color="#EF4444"/>
            <Text className="ml-2 text-red-500 font-medium">Logout</Text>
        </TouchableOpacity>
    );
};