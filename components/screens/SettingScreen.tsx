// SettingScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingScreen() {
  const [theme, setTheme] = useState('light');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };

    loadTheme();
  }, []);

  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  const handleThemeChange = async (value) => {
    setTheme(value);
    await AsyncStorage.setItem('theme', value);
    closeDialog();
  };

  const currentThemeColors = Colors[theme];

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentThemeColors.text,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  return (
    <ThemedView style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Welcome to the Setting Screen!</Text>
      <Button title="Select Theme" onPress={openDialog} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeDialog}
      >
        <View style={dynamicStyles.container}>
          <View style={dynamicStyles.modalView}>
            <Text style={dynamicStyles.modalText}>Select Theme</Text>
            <TouchableOpacity
              style={[dynamicStyles.button, dynamicStyles.buttonClose]}
              onPress={() => handleThemeChange('light')}
            >
              <Text style={dynamicStyles.textStyle}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[dynamicStyles.button, dynamicStyles.buttonClose]}
              onPress={() => handleThemeChange('dark')}
            >
              <Text style={dynamicStyles.textStyle}>Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[dynamicStyles.button, dynamicStyles.buttonClose]}
              onPress={closeDialog}
            >
              <Text style={dynamicStyles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}
