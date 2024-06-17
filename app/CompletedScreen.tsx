import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const CompletedScreen = () => {
  // Get completed todos from Redux state
  const completedTodos = useSelector(state => state.todos.completedTodos);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Todos</Text>
      <FlatList
        data={completedTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoSubtitle}>{item.subtitle}</Text>
            {/* Add more details as needed */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoItem: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: 'black',
  },
  todoTitle: {
    fontWeight: 'bold',
  },
  todoSubtitle: {
    color: 'gray',
  },
});

export default CompletedScreen;
