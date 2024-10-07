import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

interface Props {
    delay: any;
}

const Dot = ({ delay }:Props) => {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  React.useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-5, {
            duration: 450,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, {
            duration: 450,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1, 
        true 
      )
    );
  }, [translateY, delay]);

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const Loading = () => {
  return (
    <View style={styles.container}>
      <Dot delay={0} />
      <Dot delay={100} />
      <Dot delay={200} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
});

export default Loading;
