import '../global.css';
import {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Drawer} from 'expo-router/drawer';
import {store} from '../store';
import {StatusBar} from 'expo-status-bar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Stack} from 'expo-router';
import {useAppSelector} from '../store';
import {useRouter, useSegments} from 'expo-router';
import {LogoutButton} from '../components/common/LogoutButton';
import {View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {DrawerItem} from '@react-navigation/drawer'; // Import DrawerItem

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
        <GestureHandlerRootView style={{flex: 1}}>
            {isAuthenticated ? (
                <Drawer
                    screenOptions={{
                        headerStyle: {backgroundColor: '#4F46E5'},
                        headerTintColor: '#fff',
                        drawerStyle: {backgroundColor: '#fff'},
                        drawerActiveTintColor: '#4F46E5',
                        drawerItemStyle: {borderRadius: 8, marginHorizontal: 8},
                    }}
                    drawerContent={(props) => (
                        <View className="flex-1">
                            <View className="flex-1 mt-8">
                                {props.state.routeNames.map((name, index) => {
                                    const isFocused = props.state.index === index;
                                    const icon = name === '(tabs)' ? 'home' : 'person';
                                    const label = name === '(tabs)' ? 'Home' : 'Profile';

                                    return (
                                        <View
                                            key={name}
                                            className={`mx-2 mb-2 rounded-lg overflow-hidden ${
                                                isFocused ? 'bg-primary/10' : ''
                                            }`}
                                        >
                                            <DrawerItem // Use DrawerItem here
                                                label={label}
                                                focused={isFocused}
                                                icon={({size, color}) => (
                                                    <Ionicons name={icon} size={size} color={color}/>
                                                )}
                                                onPress={() => {
                                                    props.navigation.navigate(name);
                                                }}
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                            <View className="border-t border-gray-200 py-4">
                                <LogoutButton/>
                            </View>
                        </View>
                    )}
                >
                    <Drawer.Screen
                        name="(tabs)"
                        options={{
                            drawerLabel: 'Home',
                            title: 'SymptomPulse',
                        }}
                    />
                    <Drawer.Screen
                        name="profile"
                        options={{
                            drawerLabel: 'Profile',
                            title: 'Profile',
                        }}
                    />
                </Drawer>
            ) : (
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                </Stack>
            )}
            <StatusBar style="auto"/>
        </GestureHandlerRootView>
    );
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <RootLayoutNav/>
        </Provider>
    );
}