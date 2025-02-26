import '../global.css';
import {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Stack} from 'expo-router';
import {store} from '../store';
import {useAppSelector} from '../store';
import {useRouter, useSegments} from 'expo-router';

function RootLayoutNav() {
    const {isAuthenticated} = useAppSelector((state) => state.auth);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';

        if (!isAuthenticated && !inAuthGroup) {
            router.replace('/login');
        } else if (isAuthenticated && inAuthGroup) {
            router.replace('/');
        }
    }, [isAuthenticated, segments]);

    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen
                name="profile"
                options={{
                    presentation: 'modal',
                    headerShown: true,
                    title: 'Profile'
                }}
            />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <RootLayoutNav/>
        </Provider>
    );
}