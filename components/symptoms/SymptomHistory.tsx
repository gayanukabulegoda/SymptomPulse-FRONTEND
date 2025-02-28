import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useAppSelector, useAppDispatch} from '../../store/store';
import {fetchSymptomHistory} from '../../store/slices/symptomSlice';
import Animated, {FadeInUp} from 'react-native-reanimated';
/**
 * @file SymptomHistory.tsx
 * @description The symptom history component for the symptoms screen & dashboard.
 * @exports SymptomHistory
 */
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
            className="border-b border-gray-100 p-4 last:border-b-0"
            key={`symptom-entry-${item.id}`}
        >
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-semibold text-gray-800">
                    {new Date(item.entryDate).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </Text>
                <View className="bg-primary/10 px-2 py-1 rounded-full">
                    <Text className="text-xs text-primary font-medium">
                        {item.symptoms.length} {item.symptoms.length === 1 ? 'symptom' : 'symptoms'}
                    </Text>
                </View>
            </View>

            <View className="flex-row flex-wrap gap-2 mb-4">
                {item.symptoms.map((symptom: string, symptomIndex: number) => (
                    <View
                        key={`symptom-${item.id}-${symptomIndex}`}
                        className="bg-gray-100 px-3 py-1 rounded-full"
                    >
                        <Text className="text-sm text-gray-700">{symptom}</Text>
                    </View>
                ))}
            </View>

            {item.conditions?.length > 0 && (
                <View className="bg-gray-50 rounded-xl p-3">
                    <Text className="text-sm font-medium text-gray-700 mb-2">
                        Possible Conditions:
                    </Text>
                    {item.conditions.map((condition: any, conditionIndex: number) => (
                        <View
                            key={`condition-${item.id}-${conditionIndex}`}
                            className="flex-row justify-between items-center py-1"
                        >
                            <Text className="text-sm text-gray-800">
                                {condition.conditionName}
                            </Text>
                            <Text className="text-sm font-medium text-primary">
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
            keyExtractor={(item) => `entry-${item.id}`}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={
                <View className="p-6 items-center justify-center">
                    <Text className="text-gray-500 italic text-center">
                        No symptom history yet
                    </Text>
                </View>
            }
        />
    );
};