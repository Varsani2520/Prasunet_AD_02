// src/screens/HomeScreen.js
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
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
            <>
              <View style={[styles.card, { backgroundColor: card.backgroundColor }]}>
                <AntDesign name={card.icon} size={40} color="#fff" style={styles.icons} />
                <View style={styles.cardContent}>
                  <Text>{card.title}</Text>
                  <Text>{card.subtitle}</Text>
                </View>
              </View>
            </>
          ))}
        </View>
        <View style={styles.cardPair}>
          {cards.slice(2, 4).map((card) => (
            <>
              <View style={[styles.card, { backgroundColor: card.backgroundColor }]}>
                <AntDesign name={card.icon} size={40} color="#fff" style={styles.icons} />
                <View style={styles.cardContent}>
                  <Text>{card.title}</Text>
                  <Text>{card.subtitle}</Text>
                </View>
              </View>
            </>
          ))}
        </View>
      </View>

      {/* TODO List */}
      <Text style={styles.title}>Recent Tasks</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTodoPress(item.id)}>
            <View style={[styles.todoItem, { backgroundColor: item.backgroundColor }]}>
              <View style={styles.todoDetails}>
                <View style={styles.todoText}>
                  <Text style={styles.todoTitle}>{item.title}</Text>
                  <Text style={styles.todoSubtitle}>{item.subtitle}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="checkcircle" size={24} color="#74b7ec" style={{ marginRight: 10 }} />
                    <Text style={styles.todoTask}>{item.timing}</Text>
                  </View>
                </View>
                <View style={styles.progressContainer}>
                  <CircularProgress
                    value={item.progress}
                    radius={20}
                    maxValue={100}
                    activeStrokeColor="#74b7ec"
                    inActiveStrokeColor="#ddd"
                  />
                </View>
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
