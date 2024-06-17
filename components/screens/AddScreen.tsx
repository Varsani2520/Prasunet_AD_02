import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTodo } from '@/hooks/action';
import { Picker } from '@react-native-picker/picker';

const AddScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [timing, setTiming] = useState(new Date());
  const [category, setCategory] = useState('Coding');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFFF00');

  const dispatch = useDispatch();

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timing;
    setShowDatePicker(false);
    setTiming(currentDate);
  };

  const handleSubmit = () => {
    const todoItem = {
      id: Date.now().toString(),
      title,
      subtitle,
      timing: timing.toLocaleString(),
      tag: category,
      backgroundColor: selectedColor,
      progress: 0,
    };

    dispatch(addTodo(todoItem));

    setTitle('');
    setSubtitle('');
    setTiming(new Date());
    setCategory('design');
    setSelectedColor('#FFFF00'); // Reset color selection to default

    navigation.goBack();

    // Show alert message
    showAlert();
  };

  const showAlert = () => {
    Alert.alert(
      'Task Saved',
      'Your task has been saved successfully!',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  const colorOptions = [
    '#E6E6FA', // Yellow
    '#FF69B4', // Blue
    '#6495ED', // Green
    '#7FFFD4', // Red
    '#C0C0C0', // Purple
    '#f39c12', // Orange
    '#1abc9c', // Turquoise
    '#F5DEB3', // Dark Grey
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/to-do-list.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Add Todo</Text>
      </View>
      <View style={styles.formContainer}>
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
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Select category" value="Select Category" />
          <Picker.Item label="Design" value="design" />
          <Picker.Item label="Development" value="development" />
          <Picker.Item label="Coding" value="coding" />
          <Picker.Item label="Meeting" value="meeting" />
          <Picker.Item label="Office Time" value="office time" />
          <Picker.Item label="User Experience" value="user experience" />
        </Picker>
        <Text style={styles.inputLabel}>Select Color:</Text>
        <View style={styles.colorPickerContainer}>
          {colorOptions.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorOption, { backgroundColor: color }]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
      </View>
      <Button title="Create Task" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:15
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
    // backgroundColor:'#FFB6C1',
    backgroundColor:'#FFA07A',
  },
  inputLabel: {
    marginBottom: 5,
    marginLeft: 10,
    color: '#555',
    fontSize: 16,
  },
  picker: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
});

export default AddScreen;
