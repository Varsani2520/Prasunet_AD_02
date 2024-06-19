import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { cancelTodo, markAsCompleted, updateTodo } from '@/hooks/action';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

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
  const [editedCategory, setEditedCategory] = useState(todo?.category || '');

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
    const updatedTodo = { ...todo, title: editedTitle, category: editedCategory, subtitle: editedSubtitle, timing: editedTiming };
    dispatch(updateTodo(updatedTodo));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleTaskCancel = () => {
    dispatch(cancelTodo(todo))
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
          
          <Picker
           selectedValue={editedCategory}
           style={styles.picker}
           onValueChange={(itemValue) => setEditedCategory(itemValue)}
        >
          <Picker.Item label="Select category" value="Select Category" />
          <Picker.Item label="Design" value="design" />
          <Picker.Item label="Development" value="development" />
          <Picker.Item label="Coding" value="coding" />
          <Picker.Item label="Meeting" value="meeting" />
          <Picker.Item label="Office Time" value="office time" />
          <Picker.Item label="User Experience" value="user experience" />
        </Picker>
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
          <TouchableOpacity style={styles.button} onPress={handleSave}>
          <AntDesign name="save" size={20} color="blue" style={styles.icon} />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>            
        
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <AntDesign name="close" size={20} color="blue" style={styles.icon} />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.category}>tags:{todo.tag}</Text>
          <Text style={styles.title}>title:{todo.title}</Text>
          <Text style={styles.description}>description:{todo.subtitle}</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.date}>{todo.timing}</Text>
          <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <AntDesign name="edit" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleTaskCancel}>
          <AntDesign name="delete" size={20} color="red" style={styles.icon} />
          <Text style={[styles.buttonText, { color: 'red' }]}>Delete</Text>
        </TouchableOpacity>
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
    width: '80%',  // Adjust as needed
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#2196f3',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,  // Adjust flex as needed
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
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
