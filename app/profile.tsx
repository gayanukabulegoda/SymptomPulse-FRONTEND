import React from 'react';
import {View, Text} from 'react-native';
import {useAppSelector} from '../store';
import {LogoutButton} from '../components/common/LogoutButton';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {Ionicons} from '@expo/vector-icons';

const healthQuotes = [
    "Your health is an investment, not an expense.",
    "Take care of your body, it's the only place you have to live.",
    "The greatest wealth is health.",
    "Health is not valued till sickness comes.",
    "Your body hears everything your mind says."
];

export default function ProfileScreen() {
    const {user} = useAppSelector((state) => state.auth);
    const randomQuote = healthQuotes[Math.floor(Math.random() * healthQuotes.length)];

    return (
        <View className="flex-1 bg-gradient-to-b from-primary-dark to-indigo-100">
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="flex-1 p-4 md:p-6 lg:p-8"
            >
                {/* Profile Card */}
                <View className="bg-white rounded-3xl shadow-xl shadow-primary/20 overflow-hidden mb-6 md:mb-8">
                    <View className="bg-gradient-to-r from-primary-dark to-primary-light h-32 md:h-40 p-6 relative">
                        <View className="absolute -bottom-12 md:-bottom-16 left-1/2 transform -translate-x-1/3">
                            <View
                                className="w-28 h-28 rounded-full bg-white shadow-2xl shadow-primary/30 items-center justify-center border-4 border-primary-light">
                                <Ionicons name="person" size={60} color="#6366F1"/>
                            </View>
                        </View>
                    </View>

                    <View className="pt-20 pb-6 px-6">
                        <Text className="text-3xl font-extrabold text-center text-gray-900 mb-1">
                            {user?.name}
                        </Text>
                        <Text className="text-lg text-gray-500 text-center mb-6">
                            {user?.email}
                        </Text>
                        <View className="border-t border-gray-100 pt-6">
                            <LogoutButton
                                className="bg-secondary-light hover:bg-secondary-dark px-12 py-3 rounded-full shadow-md self-center items-center flex-row"
                                textClass="ml-2 text-white font-semibold text-md"
                            />
                        </View>
                    </View>
                </View>

                {/* Health Quote Card */}
                <Animated.View
                    entering={FadeInUp.delay(500).springify()}
                    className="bg-gradient-to-br from-secondary-light/10 to-white rounded-2xl shadow-lg shadow-secondary/10 p-8 mb-8 border border-secondary-light/20"
                >
                    <View className="flex-row items-center mb-5">
                        <Ionicons name="heart" size={28} color="#059669"/>
                        <Text className="text-xl font-bold text-gray-800 ml-3">
                            Daily Inspiration
                        </Text>
                    </View>
                    <Text className="text-gray-700 italic text-center text-lg leading-relaxed">
                        "{randomQuote}"
                    </Text>
                </Animated.View>

                {/* Stats Card */}
                <Animated.View
                    entering={FadeInUp.delay(700).springify()}
                    className="bg-white rounded-2xl shadow-lg shadow-primary/10  p-4 md:p-6 lg:p-8"
                >
                    <View className="flex flex-row flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
                        <View className="items-center flex-1">
                            <View className="bg-primary-light/10 p-4 rounded-full mb-3">
                                <Ionicons name="medical" size={28} color="#4F46E5"/>
                            </View>
                            <Text className="text-3xl font-bold text-primary-dark mb-1">7</Text>
                            <Text className="text-gray-600 font-medium">Active Meds</Text>
                        </View>

                        <View className="items-center flex-1">
                            <View className="bg-secondary-light/10 p-4 rounded-full mb-3">
                                <Ionicons name="pulse" size={28} color="#059669"/>
                            </View>
                            <Text className="text-3xl font-bold text-secondary-dark mb-1">14</Text>
                            <Text className="text-gray-600 font-medium">Symptoms</Text>
                        </View>

                        <View className="items-center flex-1">
                            <View className="bg-primary-light/10 p-4 rounded-full mb-3">
                                <Ionicons name="calendar" size={28} color="#4F46E5"/>
                            </View>
                            <Text className="text-3xl font-bold text-primary-dark mb-1">30</Text>
                            <Text className="text-gray-600 font-medium">Days Tracked</Text>
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
        </View>
    );
}