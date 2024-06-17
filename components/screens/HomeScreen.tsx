import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { markAsCompleted } from '@/hooks/action'; // Assuming this is correctly imported
import { Colors } from '@/constants/Colors';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos); // Fetching todos from Redux state
  const completedTodos = useSelector(state => state.todos.completedTodos); // Fetching completed todos
  const navigation = useNavigation();

  const [theme, setTheme] = useState('light');
  const [selectedMap, setSelectedMap] = useState(todos.reduce((map, todo) => {
    map[todo.id] = false;
    return map;
  }, {}));

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };

    loadTheme();
  }, []);

  const selectedList = (itemId) => {
    dispatch(markAsCompleted(itemId));
    setSelectedMap(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const navigateToTaskDetail = (id) => {
    navigation.navigate('DetailTaskScreen', { id });
  };

  const navigateToCanceled = () => {
    navigation.navigate('CanceledScreen');
  };

  const navigateToCompleted = () => {
    navigation.navigate('CompletedScreen');
  };

  const cards = [
    { id: 1, title: 'On going', subtitle: `${todos.length} Tasks`, backgroundColor: '#74b7ec', icon: 'clockcircle', onPress: navigateToTaskDetail },
    { id: 2, title: 'Completed', subtitle: `${completedTodos.length} Tasks`, backgroundColor: '#53c3c6', icon: 'checkcircle', onPress: navigateToCompleted },
  ];

  const currentThemeColors = Colors[theme];

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentThemeColors.background,
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
      color: currentThemeColors.text,
    },
    subtitle: {
      fontSize: 16,
      color: currentThemeColors.text,
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
      color: currentThemeColors.text,
    },
    todoItem: {
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      borderLeftWidth: 5,
      borderLeftColor: '#f16d55',
      backgroundColor: currentThemeColors.cardBackground,
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
      backgroundColor: currentThemeColors.cardBackground,
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
      color: currentThemeColors.cardText,
    },
    todoSubtitle: {
      color: currentThemeColors.cardText,
    },
    todoTask: {
      marginTop: 5,
      color: currentThemeColors.cardText,
    },
    icons: {
      height: 50,
      width: 50,
    },
    logo: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      {/* Top Navigation */}
      <View style={dynamicStyles.topNav}>
        <Image
          style={dynamicStyles.logo}
          source={require('../../assets/images/to-do-list.png')}
        />
        <View>
          <Text style={dynamicStyles.greetingText}>Todos</Text>
          <Text style={dynamicStyles.subtitle}>Your daily Adventure starts now</Text>
        </View>
      </View>

      {/* Cards Section */}
      <View style={dynamicStyles.cardContainer}>
        <View style={dynamicStyles.card}>
          <TouchableOpacity
            style={[dynamicStyles.cardInner, { backgroundColor: cards[0].backgroundColor }]}
            onPress={cards[0].onPress}
          >
            <AntDesign name={cards[0].icon} size={40} color="#fff" style={dynamicStyles.icons} />
            <View style={dynamicStyles.cardContent}>
              <Text>{cards[0].title}</Text>
              <Text>{cards[0].subtitle}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={dynamicStyles.card}>
          <TouchableOpacity
            style={[dynamicStyles.cardInner, { backgroundColor: cards[1].backgroundColor }]}
            onPress={cards[1].onPress}
          >
            <AntDesign name={cards[1].icon} size={40} color="#fff" style={dynamicStyles.icons} />
            <View style={dynamicStyles.cardContent}>
              <Text>{cards[1].title}</Text>
              <Text>{cards[1].subtitle}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* TODO List */}
      <Text style={dynamicStyles.title}>Recent Tasks</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToTaskDetail(item.id)}>
            <View style={[dynamicStyles.todoItem, { backgroundColor: item.backgroundColor }]}>
              <View style={dynamicStyles.todoDetails}>
                <View style={dynamicStyles.todoText}>
                  <Text style={dynamicStyles.todoTitle}>{item.title}</Text>
                  <Text style={dynamicStyles.todoSubtitle}>{item.subtitle}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={dynamicStyles.todoTask}>{item.timing}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => selectedList(item.id)}>
                  <View style={dynamicStyles.progressContainer}>
                    <Text>
                      {selectedMap[item.id] ? (
                        <AntDesign name="checkcircle" size={30} color="#74b7ec" style={dynamicStyles.icon} />
                      ) : (
                        <AntDesign name="checkcircleo" size={30} color="#74b7ec" style={dynamicStyles.icon} />
                      )}
                    </Text>
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

export default HomeScreen;
