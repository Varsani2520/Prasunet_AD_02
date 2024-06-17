import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { markAsCompleted, updateTodo } from '@/hooks/action';

const DetailTaskScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id } = route.params;
  const todos = useSelector(state => state.todos.todos);
  const todo = todos.find(item => item.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo?.title || '');
  const [editedTag, setEditedTag] = useState(todo?.tag || '');
  const [editedSubtitle, setEditedSubtitle] = useState(todo?.subtitle || '');
  const [editedTiming, setEditedTiming] = useState(todo?.timing || '');

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Todo not found!</Text>
      </View>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTodo = { ...todo, title: editedTitle, tag: editedTag, subtitle: editedSubtitle, timing: editedTiming };
    dispatch(updateTodo(updatedTodo));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleTaskCancel = () => {
    dispatch(markAsCompleted(todo.id));
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: todo.backgroundColor }]}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            value={editedTag}
            onChangeText={setEditedTag}
            placeholder="Category"
          />
          <TextInput
            style={styles.input}
            value={editedSubtitle}
            onChangeText={setEditedSubtitle}
            placeholder="Description"
          />
          <TextInput
            style={styles.input}
            value={editedTiming}
            onChangeText={setEditedTiming}
            placeholder="Date"
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={handleCancel} color="red" />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{todo.title}</Text>
          <Text style={styles.category}>{todo.tag}</Text>
          <Text style={styles.description}>{todo.subtitle}</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.date}>{todo.timing}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={handleEdit} />
            <Button title="Cancel Task" onPress={handleTaskCancel} color="red" />
          </View>
        </>
      )}
      <View style={[styles.colorIndicator, { backgroundColor: todo.backgroundColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  category: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    lineHeight: 24,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  date: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  colorIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DetailTaskScreen;
