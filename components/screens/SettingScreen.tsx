import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { PieChart } from 'react-native-chart-kit';

export default function SettingScreen() {
  const [showChart, setShowChart] = useState(false);

  const todos = useSelector(state => state.todos.todos);
  const completedTodos = useSelector(state => state.todos.completedTodos);

  const totalTodos = todos.length + completedTodos.length;

  const data = [
    {
      name: 'Completed',
      count: completedTodos.length,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'In Progress',
      count: todos.length,
      color: 'blue',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      marginBottom: 10,
      width: 200,
      alignItems: 'center',
      backgroundColor: '#2196F3',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16,
    },
    total:{
      fontWeight:'bold',
      fontSize:24,
    }
  });

  return (
    <View style={styles.container}>
      {showChart ? (
        <>
          <PieChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
          <Text style={styles.total}>Total Todos: {totalTodos}</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Welcome to the Setting Screen!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowChart(true)}
          >
            <Text style={styles.buttonText}>View Analytics</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
