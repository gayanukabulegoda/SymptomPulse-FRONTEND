import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {useAppSelector} from '../../store/store';
import {Card} from '../../components/common/Card';
import {Ionicons} from '@expo/vector-icons';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useRouter} from 'expo-router';
import {LogoutButton} from '../../components/common/LogoutButton';
import {SymptomHistory} from "../../components/symptoms/SymptomHistory";
/**
 * @file index.tsx
 * @description Home screen component for user to view features and navigate to other screens.
 * @exports HomeScreen
 */
const {width} = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(View);

export default function HomeScreen() {
    const {user} = useAppSelector((state) => state.auth);
    const router = useRouter();
    const [showHistory, setShowHistory] = useState(false);

    const features: {
        title: string;
        icon: keyof typeof Ionicons.glyphMap;
        route: string;
        delay: number;
        description: string;
        style?: any;
        onPress?: () => void
    }[] = [
        {
            title: "Track Symptoms",
            icon: "medical",
            route: "/symptoms",
            delay: 200,
            description: "Log and monitor your symptoms",
        },
        {
            title: "Medications",
            icon: "medical-outline",
            route: "/medications",
            delay: 400,
            description: "Manage your medications",
        },
        {
            title: "History",
            icon: "time",
            route: "/symptoms",
            delay: 600,
            description: "View your health timeline",
            onPress: () => setShowHistory(true)
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
        <AnimatedScrollView className="flex-1 bg-gray-50">
            <View className="bg-primary p-6 rounded-b-3xl shadow-lg">
                <View className="flex-row justify-between items-center mb-6">
                    <TouchableOpacity
                        onPress={() => router.push('/profile')}
                        className="flex-row items-center"
                    >
                        <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
                            <Ionicons name="person" size={24} color="white"/>
                        </View>
                        <View>
                            <Text className="text-white text-lg font-semibold">
                                Welcome back,
                            </Text>
                            <Text className="text-white text-xl font-bold">
                                {user?.name || 'User'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <LogoutButton/>
                </View>

                <Animated.View
                    entering={FadeInDown.duration(1000).springify()}
                    className="bg-white/10 rounded-xl p-4"
                >
                    <Text className="text-white text-base">
                        Track your symptoms and medications easily with SymptomPulse
                    </Text>
                </Animated.View>
            </View>

            <View className="p-4">
                <View className="flex-row flex-wrap justify-between">
                    {features.map((feature) => (
                        <Animated.View
                            key={feature.title}
                            entering={FadeInDown.delay(feature.delay).springify()}
                            style={[{width: (width - 32) / 2 - 8}, feature.style]}
                            className="mb-4"
                        >
                            <Card
                                title={feature.title}
                                description={feature.description}
                                icon={<Ionicons name={feature.icon} size={24} color="#4F46E5"/>}
                                onPress={feature.onPress || (() => router.push(feature.route))}
                            />
                        </Animated.View>
                    ))}
                </View>

                {showHistory && (
                    <View className="mt-4">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-xl font-bold text-gray-800">
                                Symptom History
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowHistory(false)}
                                className="p-2"
                            >
                                <Ionicons name="close" size={24} color="#6B7280"/>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 400}}>
                            <SymptomHistory/>
                        </View>
                    </View>
                )}
            </View>
        </AnimatedScrollView>
    );
}