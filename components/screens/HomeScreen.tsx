import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { markAsCompleted } from '@/hooks/action';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const cards = [
    { id: 1, title: 'On going', subtitle: '24 Tasks', backgroundColor: '#74b7ec', icon: 'clockcircle' },
    { id: 2, title: 'In Process', subtitle: '24 Tasks', backgroundColor: '#fdc246', icon: 'loading1' },
    { id: 3, title: 'Completed', subtitle: '24 Tasks', backgroundColor: '#53c3c6', icon: 'checkcircle' },
    { id: 4, title: 'Canceled', subtitle: '24 Tasks', backgroundColor: '#d8604b', icon: 'closecircle' },
  ];

  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
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

  const navigateToCompleted = () => {
    navigation.navigate('CompletedScreen');
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.greetingText}>Hi, Bruce👋</Text>
          <Text style={styles.subtitle}>Your daily Adventure starts now</Text>
        </View>
        <TouchableOpacity style={styles.menuIcon}>
          <AntDesign name="menuunfold" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Cards Section */}
      <View style={styles.cardContainer}>
        <View style={styles.cardPair}>
          {cards.slice(0, 2).map((card) => (
            <View key={card.id} style={[styles.card, { backgroundColor: card.backgroundColor }]}>
              <AntDesign name={card.icon} size={40} color="#fff" style={styles.icons} />
              <View style={styles.cardContent}>
                <Text>{card.title}</Text>
                <Text>{card.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.cardPair}>
          {cards.slice(2, 4).map((card) => (
            <TouchableOpacity key={card.id} style={[styles.card, { backgroundColor: card.backgroundColor }]} onPress={navigateToCompleted}>
              <AntDesign name={card.icon} size={40} color="#fff" style={styles.icons} />
              <View style={styles.cardContent}>
                <Text>{card.title}</Text>
                <Text>{card.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* TODO List */}
      <Text style={styles.title}>Recent Tasks</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
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
                  <Text>{selectedMap[item.id] ? '👍' : '👎'}</Text>
                </View>
              </TouchableOpacity>
            </View>
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
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
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
    borderLeftColor: 'black',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardPair: {
    width: '48%',
  },
  card: {
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
});

export default HomeScreen;
