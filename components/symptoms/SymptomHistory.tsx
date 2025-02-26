import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useAppSelector, useAppDispatch} from '../../store';
import {fetchSymptomHistory} from '../../store/slices/symptomSlice';
import Animated, {FadeInUp} from 'react-native-reanimated';

export const SymptomHistory = () => {
    const dispatch = useAppDispatch();
    const {entries, loading, hasMore, currentPage} = useAppSelector(
        (state) => state.symptoms
    );

    const loadMore = () => {
        if (!loading && hasMore) {
            dispatch(fetchSymptomHistory({page: currentPage + 1, limit: 10}));
        }
    };

    const renderItem = ({item, index}: { item: any; index: number }) => (
        <Animated.View
            entering={FadeInUp.delay(index * 100)}
            style={styles.historyCard}
        >
            <Text style={styles.dateText}>
                {new Date(item.entryDate).toLocaleDateString()}
            </Text>

            <View style={styles.symptomsContainer}>
                {item.symptoms.map((symptom: string, symptomIndex: number) => (
                    <View
                        key={`${item.id}-${symptom}-${symptomIndex}`}
                        style={styles.symptomTag}
                    >
                        <Text style={styles.symptomText}>{symptom}</Text>
                    </View>
                ))}
            </View>

            {item.conditions?.length > 0 && (
                <View>
                    <Text style={styles.conditionsTitle}>
                        Possible Conditions:
                    </Text>
                    {item.conditions.map((condition: any, conditionIndex: number) => (
                        <View
                            key={`${item.id}-${condition.conditionName}-${conditionIndex}`}
                            style={styles.conditionRow}
                        >
                            <Text style={styles.conditionName}>
                                {condition.conditionName}
                            </Text>
                            <Text style={styles.likelihood}>
                                {condition.likelihood}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </Animated.View>
    );

    return (
        <FlatList
            data={entries}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
                <Text style={styles.emptyText}>
                    No symptom history yet
                </Text>
            }
        />
    );
};

const styles = StyleSheet.create({
    listContent: {
        flexGrow: 1,
    },
    historyCard: {
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
    dateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
    },
    symptomsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    symptomTag: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    symptomText: {
        color: '#4B5563',
        fontSize: 14,
    },
    conditionsTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    conditionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    conditionName: {
        color: '#4B5563',
        fontSize: 14,
    },
    likelihood: {
        color: '#4F46E5',
        fontSize: 14,
        fontWeight: '500',
    },
    emptyText: {
        textAlign: 'center',
        color: '#6B7280',
        fontStyle: 'italic',
        marginTop: 16,
    },
});