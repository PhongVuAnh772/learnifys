import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import iconFocused from '@/assets/tabs/home-focused.png'
import iconUnfocused from '@/assets/tabs/home-unfocused.png'
import { blurhash } from '@/constants/BlurHash'
import { Image } from 'expo-image'
interface Props {
    size: number;
    color: string;
    focused: boolean;
}

const HomeIcon = ({ size, color,focused }:Props) => {
  return (
    
        focused ? <Image
            source={iconFocused}
            style={styles.image}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
          />: <Image
            source={iconUnfocused}
            style={styles.image}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
          />
    
  )
}

export default HomeIcon

const styles = StyleSheet.create({
    image: {
        width: 24,
        height: 24,
    }
})