import React from 'react';
import {View, Text, Image} from 'react-native';
import {Link} from 'expo-router';
import {LoginForm} from '../../components/auth/LoginForm';
import Animated, {FadeInDown} from 'react-native-reanimated';

export default function LoginScreen() {
    return (
        <View className="flex-1 bg-gray-50">
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="flex-1 px-4 py-8 justify-center"
            >
                <View className="mb-8">
                    <Image
                        source={{uri: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=200&auto=format'}}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                </View>

                <View className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
                    <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
                        Welcome Back
                    </Text>
                    <Text className="text-gray-600 text-center mb-8">
                        Sign in to continue to SymptomPulse
                    </Text>
                    <LoginForm/>
                    <View className="flex-row justify-center items-center mt-6">
                        <Text className="text-gray-600">Don't have an account? </Text>
                        <Link href="/register" className="text-primary font-semibold">
                            Register
                        </Link>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}