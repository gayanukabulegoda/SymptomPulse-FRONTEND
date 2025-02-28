import {Link, Stack} from 'expo-router';
import {Text, View} from 'react-native';
/**
 * @file not-found.tsx
 * @description Not found screen component for user to view when a screen doesn't exist.
 * @exports NotFoundScreen
 */
export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Oops!'}}/>
            <View className="flex-1 items-center justify-center p-5">
                <Text className="text-xl font-semibold mb-4">
                    This screen doesn't exist.
                </Text>
                <Link href="/" className="mt-4 py-4 text-blue-500">
                    <Text>Go to home screen!</Text>
                </Link>
            </View>
        </>
    );
}