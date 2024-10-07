import React, { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";
import { useTranslation } from "react-i18next";

interface ToastProps {
  message: string;
  onHide: () => void;
}

const ToastCustom: React.FC<ToastProps> = ({ message, onHide }) => {
  const opacity = useRef(new Animated.Value(0)).current;
 

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, [opacity, onHide]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        backgroundColor: "white",
        padding: 10,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1,
        elevation: 1,
        position: "absolute",
        // left: '20%',
        bottom: '10%',
        alignSelf: "center",
        height: 55,
        width: 200,
        borderRadius: 1000,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontFamily: "quicksand-bold", fontSize: 14}}>{message}</Text>
    </Animated.View>
  );
};

export default ToastCustom;
