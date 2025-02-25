import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export const MedicationCard = ({medication}: { medication: any }) => {
    const getScheduleText = (schedule: string) => {
        switch (schedule) {
            case 'DAILY':
                return 'Once daily';
            case 'TWICE_DAILY':
                return 'Twice daily';
            default:
                return schedule;
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.name}>{medication.name}</Text>
                    <Text style={styles.schedule}>
                        {getScheduleText(medication.schedule)}
                    </Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#6B7280"/>
                </TouchableOpacity>
            </View>

            <View style={styles.details}>
                {medication.dosage && (
                    <View style={styles.detailRow}>
                        <Ionicons name="medical" size={16} color="#4F46E5"/>
                        <Text style={styles.detailText}>{medication.dosage}</Text>
                    </View>
                )}

                <View style={styles.detailRow}>
                    <Ionicons name="calendar" size={16} color="#4F46E5"/>
                    <Text style={styles.detailText}>
                        Started {new Date(medication.startDate).toLocaleDateString()}
                    </Text>
                </View>

                {medication.endDate && (
                    <View style={styles.detailRow}>
                        <Ionicons name="calendar-outline" size={16} color="#4F46E5"/>
                        <Text style={styles.detailText}>
                            Until {new Date(medication.endDate).toLocaleDateString()}
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981"/>
                    <Text style={[styles.actionText, {color: '#10B981'}]}>
                        Take Now
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="time" size={20} color="#6B7280"/>
                    <Text style={styles.actionText}>View History</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    titleContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    schedule: {
        fontSize: 14,
        color: '#6B7280',
    },
    moreButton: {
        padding: 4,
    },
    details: {
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#4B5563',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    actionText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#6B7280',
    },
});