import { StyleSheet, Text, View,Pressable  } from 'react-native'
import React from 'react'
import i18n from '@/translations'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { useTranslation } from "react-i18next";

const LoginButton = () => {
   
    const router = useRouter()
    const onPress = () => {
        router.push('/(modals)/login')
    }
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{i18n.t("login")}</Text>
    </Pressable>
  )
}

export default LoginButton

const styles = StyleSheet.create({
    button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.primary,
    maxWidth: 150
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily:'cereal-bold'
  },
})