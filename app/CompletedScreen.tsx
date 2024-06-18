import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors'; // Adjust the import path as needed

const CompletedScreen = () => {
  const completedTodos = useSelector(state => state.todos.completedTodos);
  
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };

    loadTheme();
  }, []);

  const currentThemeColors = Colors[theme];

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentThemeColors.background,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: currentThemeColors.text,
    },
    todoItem: {
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      borderLeftWidth: 5,
      borderLeftColor: currentThemeColors.tint,
      // backgroundColor: currentThemeColors.background,
    },
    todoTitle: {
      fontWeight: 'bold',
      // color: currentThemeColors.text,
    },
   
  });

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Completed Todos</Text>
      <FlatList
        data={completedTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[dynamicStyles.todoItem, { backgroundColor: item.backgroundColor }]}
          >        
              <Text style={dynamicStyles.todoTitle}>{item.title}</Text>
            <Text style={dynamicStyles.todoSubtitle}>{item.subtitle}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CompletedScreen;
