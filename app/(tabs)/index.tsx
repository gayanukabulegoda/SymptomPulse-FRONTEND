import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useAppSelector} from '../../store';
import {Card} from '../../components/common/Card';
import {Ionicons} from '@expo/vector-icons';
import Animated, {FadeInDown, FadeInRight} from 'react-native-reanimated';
import {useRouter} from 'expo-router';

export default function HomeScreen() {
    const {user} = useAppSelector((state) => state.auth);
    const router = useRouter();

    const features: {
        title: string;
        icon: keyof typeof Ionicons.glyphMap;
        route: string;
        delay: number;
        description: string
    }[] = [
        {
            title: "Track Symptoms",
            icon: "medical",
            route: "/symptoms",
            delay: 200,
            description: "Log and monitor your symptoms"
        },
        {
            title: "Medications",
            icon: "medical-outline",
            route: "/medications",
            delay: 400,
            description: "Manage your medications"
        },
        {
            title: "History",
            icon: "time",
            route: "/symptoms",
            delay: 600,
            description: "View your health timeline"
        },
        {
            title: "Notifications",
            icon: "notifications",
            route: "/notifications",
            delay: 800,
            description: "Check your reminders"
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
                                description={feature.description}
                                icon={<Ionicons name={feature.icon} size={24} color="#4F46E5"/>}
                                onPress={() => router.push(feature.route)}
                            />
                        </Animated.View>
                    ))}
                </View>
            </Animated.View>
        </ScrollView>
    );
}