import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

const DetailTaskScreen = () => {
  const route = useRoute();
  console.log('Route params:', route.params); // Check route parameters

  const { id } = route.params; // Get taskId from navigation parameters
  const todos = useSelector(state => state.todos.todos);
  const todo = todos.find(item => item.id === id);
  console.log('Selected todo:', todo); // Check selected todo from Redux state

  // Handle case when todo is not found
  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Todo not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={styles.subtitle}>{todo.subtitle}</Text>
      <Text style={styles.label}>Category:</Text>
      <Text>{todo.tag}</Text>
      <Text style={styles.label}>Date:</Text>
      <Text>{todo.timing}</Text>
      <View style={[styles.colorIndicator, { backgroundColor: todo.backgroundColor }]} />
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  colorIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DetailTaskScreen;
