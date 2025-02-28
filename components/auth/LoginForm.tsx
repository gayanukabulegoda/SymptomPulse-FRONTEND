import React, {useState} from 'react';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {login} from '../../store/slices/authSlice';
import {Button} from '../common/Button';
import {Input} from '../common/Input';
/**
 * @file LoginForm.tsx
 * @description The login form component for login screen.
 * @exports LoginForm
 */
export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const {loading, error} = useAppSelector((state) => state.auth);

    const handleLogin = () => {
        dispatch(login({email, password}));
    };

    return (
        <View className="w-full">
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                error={error ?? undefined}
            />
            <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
            />
            <Button
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                className="mt-4"
            >
                Login
            </Button>
        </View>
    );
};