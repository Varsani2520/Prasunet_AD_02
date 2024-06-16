import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTodo } from '@/hooks/action';
import { Picker } from '@react-native-picker/picker';

const AddScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [timing, setTiming] = useState(new Date());
  const [category, setCategory] = useState('design');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#FFFF00');

  const dispatch = useDispatch();

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timing;
    setShowDatePicker(false);
    setTiming(currentDate);
  };

  const handleSubmit = () => {
    const todoItem = {
      id: Date.now().toString(), // Ensure each todo has a unique id
      title,
      subtitle,
      timing: timing.toLocaleString(),
      tag: category,
      backgroundColor,
      progress: 0, // Initialize progress
    };

    dispatch(addTodo(todoItem));

    setTitle('');
    setSubtitle('');
    setTiming(new Date());
    setCategory('design');
    setBackgroundColor('#FFFF00');

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={timing.toLocaleDateString()}
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={timing}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Task Details"
        value={subtitle}
        onChangeText={setSubtitle}
      />
      <Text style={styles.inputLabel}>Select Category:</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Design" value="design" />
        <Picker.Item label="Development" value="development" />
        <Picker.Item label="Coding" value="coding" />
        <Picker.Item label="Meeting" value="meeting" />
        <Picker.Item label="Office Time" value="office time" />
        <Picker.Item label="User Experience" value="user experience" />
      </Picker>
      <Button title="Create Task" onPress={handleSubmit} />
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
  inputLabel: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10,
    color: '#555',
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
});

export default AddScreen;
