import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';

export default function SettingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // No need to load theme as we've removed theme selection
  }, []);

  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  const handleAnalytics = () => {
    // Navigate to analytics screen or perform analytics calculation here
    // For simplicity, I'm just logging the analytics data here
    console.log("Performing analytics based on todos...");
    closeDialog();
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff', // Assuming default background color
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
      backgroundColor: '#2196F3', // Assuming default button color
    },
    buttonText: {
      color: '#fff', // Assuming default button text color
      fontWeight: 'bold',
    },
  });

  return (
    <ThemedView style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Welcome to the Setting Screen!</Text>
      <TouchableOpacity
        style={dynamicStyles.button}
        onPress={handleAnalytics}
      >
        <Text style={dynamicStyles.buttonText}>View Analytics</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}
