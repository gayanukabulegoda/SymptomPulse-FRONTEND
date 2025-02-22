import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useAppSelector} from '../../store';
import {Card} from '../../components/common/Card';
import {Ionicons} from '@expo/vector-icons';
import Animated, {FadeInDown, FadeInRight} from 'react-native-reanimated';

export default function HomeScreen() {
    const {user} = useAppSelector((state) => state.auth);

    const features: { title: string; icon: keyof typeof Ionicons.glyphMap; delay: number }[] = [
        {
            title: "Track Symptoms",
            icon: "medical",
            delay: 200,
        },
        {
            title: "Medications",
            icon: "medical-outline",
            delay: 400,
        },
        {
            title: "History",
            icon: "time",
            delay: 600,
        },
        {
            title: "Notifications",
            icon: "notifications",
            delay: 800,
        },
    ];

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="p-4"
            >
                <View className="mb-6">
                    <Text className="text-3xl font-bold text-gray-800">
                        Welcome back,
                    </Text>
                    <Text className="text-3xl font-bold text-primary">
                        {user?.name || 'User'}!
                    </Text>
                    <Text className="text-gray-600 mt-2">
                        Track your symptoms and medications easily
                    </Text>
                </View>

                <View className="flex-row flex-wrap justify-between">
                    {features.map((feature, index) => (
                        <Animated.View
                            key={feature.title}
                            entering={FadeInRight.delay(feature.delay).springify()}
                            className="w-[48%] mb-4"
                        >
                            <Card
                                title={feature.title}
                                icon={<Ionicons name={feature.icon} size={24} color="#4F46E5"/>}
                                onPress={() => {
                                }}
                            />
                        </Animated.View>
                    ))}
                </View>
            </Animated.View>
        </ScrollView>
    );
}