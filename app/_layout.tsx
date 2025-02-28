import '../global.css';
import {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Stack} from 'expo-router';
import {store} from '../store/store';
import {useAppSelector, useAppDispatch} from '../store/store';
import {useRouter, useSegments} from 'expo-router';
import {clearRegistrationSuccess} from '../store/slices/authSlice';
/**
 * @author: Gayanuka Bulegoda
 * @github: https://github.com/gayanukabulegoda
 * @portfolio: https://grbulegoda.me
 * -------------------------------------------------------------------
 * @project: SymptomPulse FRONTEND
 * @since: 21-02-2025 8.00 PM
 * @version: 1.0.0
 * -------------------------------------------------------------------
 * @file: RootLayout.tsx - The main entry point of the application.
 * -------------------------------------------------------------------
 */
function RootLayoutNav() {
    const {isAuthenticated, registrationSuccess} = useAppSelector((state) => state.auth);
    const segments = useSegments();
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';

        if (registrationSuccess) {
            dispatch(clearRegistrationSuccess());
            router.replace('/login');
            return;
        }

        // Normal auth flow
        if (!isAuthenticated && !inAuthGroup) {
            router.replace('/login');
        } else if (isAuthenticated && inAuthGroup) {
            router.replace('/');
        }
    }, [isAuthenticated, registrationSuccess, segments, dispatch, router]);

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