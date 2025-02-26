import {Stack} from 'expo-router';

export default function MedicationLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="add"/>
        </Stack>
    );
}