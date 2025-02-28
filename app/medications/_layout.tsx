import {Stack} from 'expo-router';
/**
 * @file _layout.tsx
 * @description Layout component for the medication screens.
 * @exports MedicationLayout
 */
export default function MedicationLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="add"/>
        </Stack>
    );
}