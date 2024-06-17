import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CanceledScreen = () => {
  const canceledTodos = useSelector(state => state.canceledTodos);

  return (
    <View style={styles.container}>
      <Text>Canceled Todos</Text>
      <FlatList
        data={canceledTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.subtitle}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CanceledScreen;
