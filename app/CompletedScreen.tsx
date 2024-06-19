import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CompletedScreen = () => {
  const completedTodos = useSelector(state => state.todos.completedTodos);


  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black',
    },
    todoItem: {
      // borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      borderLeftWidth: 5,
      borderLeftColor:  '#00b48a',
    },
    todoTitle: {
      fontWeight: 'bold',
      // color: currentThemeColors.text,
    },
   
  });

  return (
    <View style={dynamicStyles.container}>
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
