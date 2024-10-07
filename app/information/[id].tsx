import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { defaultStyles } from '@/constants/Styles';
import i18n from '@/translations';
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t("changing-information"),
      headerTransparent: true,
      
      headerRight: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
      
    });
  }, []);

  

  return (
    <View style={styles.container}>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  roundButton: {
    width: 48,height: 48,
    borderRadius:1000
  }
});

export default DetailsPage;
