import React, {useState} from 'react';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store';
import {register} from '../../store/slices/authSlice';
import {Button} from '../common/Button';
import {Input} from '../common/Input';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const {loading, error} = useAppSelector((state) => state.auth);

    const handleRegister = () => {
        dispatch(register({name, email, password}));
    };

    return (
        <View className="w-full">
            <Input
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
            />
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
            />
            <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Choose a password"
                secureTextEntry
                error={error ?? undefined}
            />
            <Button
                onPress={handleRegister}
                loading={loading}
                disabled={loading}
                className="mt-4"
            >
                Register
            </Button>
        </View>
    );
};