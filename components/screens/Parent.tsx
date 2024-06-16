import React, { useState } from 'react';
import { View, Button } from 'react-native';
import AddScreen from './AddScreen';

const Parent = () => {
  const handleSave = () => {
    console.log('Saved successfully!');
    // Implement logic after save if needed
  };

  return (
    <View>
      {/* Navigate to AddScreen and pass onSave */}
      <Button
        title="Go to AddScreen"
        onPress={() => navigation.navigate('AddScreen', { onSave: handleSave })}
      />
      <AddScreen onSave={handleSave} />
    </View>
  );
};

export default Parent;
