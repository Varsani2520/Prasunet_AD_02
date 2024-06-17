import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { markAsCompleted } from '@/hooks/action'; // Assuming this is correctly imported

const HomeScreen = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos); // Fetching todos from Redux state
  const completedTodos = useSelector(state => state.todos.completedTodos); // Fetching completed todos
  const navigation = useNavigation();

  // Maintain a map of selected states for each todo item
  const [selectedMap, setSelectedMap] = useState(todos.reduce((map, todo) => {
    map[todo.id] = false;
    return map;
  }, {}));

  const selectedList = (itemId) => {
    // Toggle the completion status for the selected item
    dispatch(markAsCompleted(itemId));
    setSelectedMap(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const navigateToTaskDetail = (id) => {
    // Dynamically navigate to the task detail screen with id
    navigation.navigate('DetailTaskScreen', { id });
  };

  const navigateToCanceled = () => {
    navigation.navigate('CanceledScreen'); // Navigate to CanceledScreen
  };

  const navigateToCompleted = () => {
    navigation.navigate('CompletedScreen'); // Navigate to CompletedScreen
  };

  // Cards for "On going" and "Completed"
  const cards = [
    { id: 1, title: 'On going', subtitle: `${todos.length} Tasks`, backgroundColor: '#74b7ec', icon: 'clockcircle', onPress: navigateToTaskDetail },
    { id: 2, title: 'Completed', subtitle: `${completedTodos.length} Tasks`, backgroundColor: '#53c3c6', icon: 'checkcircle', onPress: navigateToCompleted },
  ];

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <Image
        style={styles.logo}
        source={require('../../assets/images/to-do-list.png')}
      />       
       <View>
          <Text style={styles.greetingText}>Todos</Text>
          <Text style={styles.subtitle}>Your daily Adventure starts now</Text>
        </View>
        {/* <TouchableOpacity style={styles.menuIcon}>
          <AntDesign name="menuunfold" size={20} color="#000" />
        </TouchableOpacity> */}
      </View>

      {/* Cards Section */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <TouchableOpacity
            style={[styles.cardInner, { backgroundColor: cards[0].backgroundColor }]}
            onPress={cards[0].onPress}
          >
            <AntDesign name={cards[0].icon} size={40} color="#fff" style={styles.icons} />
            <View style={styles.cardContent}>
              <Text>{cards[0].title}</Text>
              <Text>{cards[0].subtitle}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <TouchableOpacity
            style={[styles.cardInner, { backgroundColor: cards[1].backgroundColor }]}
            onPress={cards[1].onPress}
          >
            <AntDesign name={cards[1].icon} size={40} color="#fff" style={styles.icons} />
            <View style={styles.cardContent}>
              <Text>{cards[1].title}</Text>
              <Text>{cards[1].subtitle}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* TODO List */}
      <Text style={styles.title}>Recent Tasks</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToTaskDetail(item.id)}>
            <View style={[styles.todoItem, { backgroundColor: item.backgroundColor }]}>
              <View style={styles.todoDetails}>
                <View style={styles.todoText}>
                  <Text style={styles.todoTitle}>{item.title}</Text>
                  <Text style={styles.todoSubtitle}>{item.subtitle}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.todoTask}>{item.timing}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => selectedList(item.id)}>
                  <View style={styles.progressContainer}>
                    <Text>{selectedMap[item.id] ?         <AntDesign name="checkcircle" size={30} color="#74b7ec" style={styles.icon} />
 :         <AntDesign name="checkcircleo" size={30} color="#74b7ec" style={styles.icon} />
}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
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
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  menuIcon: {
    marginLeft: 'auto',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
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
    borderLeftColor: '#f16d55',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoText: {
    flex: 1,
  },
  todoTitle: {
    fontWeight: 'bold',
  },
  todoSubtitle: {
    color: 'gray',
  },
  todoTask: {
    marginTop: 5,
  },
  icons: {
    height: 50,
    width: 50,
  },
  logo: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    marginRight: 10,
  },
});

export default HomeScreen;
