import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
/**
 * @file _layout.tsx
 * @description Layout component for the tab navigation screens.
 * @exports TabLayout
 */
export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#4F46E5',
                tabBarInactiveTintColor: '#6B7280',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="home" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="symptoms"
                options={{
                    title: 'Symptoms',
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="medical" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="medications"
                options={{
                    title: 'Medications',
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="medical-outline" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: 'Notifications',
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="notifications" size={size} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}