import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MedicationList} from '../../components/medications/MedicationList';
import {AddMedicationButton} from '../../components/medications/AddMedicationButton';
import Animated, {FadeInDown} from 'react-native-reanimated';

export default function MedicationsScreen() {
    return (
        <View style={styles.container}>
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={styles.header}
            >
                <Text style={styles.title}>Medications</Text>
                <Text style={styles.subtitle}>
                    Track and manage your medications
                </Text>
            </Animated.View>

            <MedicationList/>
            <AddMedicationButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 8,
    },
});