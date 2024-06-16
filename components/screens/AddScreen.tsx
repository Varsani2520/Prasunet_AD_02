import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddScreen = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [timing, setTiming] = useState('');
  const [tag, setTag] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFF00');

  const handleSubmit = async () => {
    const todoItem = {
      title,
      subtitle,
      timing,
      tag,
      backgroundColor,
    };

    try {
      // Retrieve existing todos or initialize empty array if none exists
      const existingTodos = await AsyncStorage.getItem('todos');
      const todos = existingTodos ? JSON.parse(existingTodos) : [];

      // Add new todoItem to the list
      todos.push(todoItem);

      // Save updated todos list back to AsyncStorage
      await AsyncStorage.setItem('todos', JSON.stringify(todos));

      // Notify parent component (likely TodoScreen) of save
      onSave(); // Ensure onSave is a function and is called correctly
      
      // Optionally, reset state or close modal
      setTitle('');
      setSubtitle('');
      setTiming('');
      setTag('');
      setBackgroundColor('#FFFFFF');
    } catch (error) {
      console.error('Error saving todo item:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add TODO Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Subtitle"
        value={subtitle}
        onChangeText={setSubtitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Timing"
        value={timing}
        onChangeText={setTiming}
      />
      <TextInput
        style={styles.input}
        placeholder="Tag"
        value={tag}
        onChangeText={setTag}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default AddScreen;
