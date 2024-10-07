import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

interface Props {
    navigation: () => void;
    style?: object;
}

const ButtonAdd = ({navigation, style }:Props) => {
  const router = useRouter();
  return (
    <Pressable style={[styles.container, style]} onPress={navigation}>
      <MaterialIcons name="add" size={22} color="white" />
    </Pressable>
  )
}

export default ButtonAdd

const styles = StyleSheet.create({
    container: {
        width: 40,height:40,
        backgroundColor:"#D80100",
        borderRadius:32,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "rgb(227, 144, 144)",
        borderWidth:3
    }
})