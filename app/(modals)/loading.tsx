import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import icon from '@/assets/images/playstore.png'
import { Redirect, useNavigationContainerRef, useRouter } from 'expo-router';
const Loading = () => {
  const router = useRouter();
  // useEffect(() => {
  //   fi
  // }, [])
  
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon}/> 
      <ActivityIndicator animating size="large" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems:"center",
    justifyContent:"center",
    gap: 15
  },
  icon: {
    width: 300,
    height: 300
  }
})