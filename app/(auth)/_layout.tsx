import {Stack} from 'expo-router';
/**
 * @file _layout.tsx
 * @description Layout component for the authentication screens.
 * @exports AuthLayout
 */
export default function AuthLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="login"/>
            <Stack.Screen name="register"/>
        </Stack>
    );
}