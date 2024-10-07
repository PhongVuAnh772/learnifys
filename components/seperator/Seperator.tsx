import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Seperator = () => {
  return (
        <View style={styles.seperator}></View>
  )
}

export default Seperator

const styles = StyleSheet.create({
    seperator: {
    backgroundColor: "#F1F2F4",
    width: "100%",
    height: 1,
    marginVertical: 10,
  },
})