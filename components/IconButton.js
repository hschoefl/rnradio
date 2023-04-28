import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../constants/Colors';

const IconButton = ({icon, color, size, onPress, children}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.button}>
        <Ionicons name={icon} color={color} size={size} />
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
};
export default IconButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: Color.primaryRedMinus3,
  },
  text: {
    color: Color.blue4,
    marginLeft: 10,
  },
  pressed: {
    opacity: 0.75,
  },
});
