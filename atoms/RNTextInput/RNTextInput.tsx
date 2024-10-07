import type {Component, ForwardedRef} from 'react';
import React from 'react';
import type {TextInputProps} from 'react-native';
import {TextInput} from 'react-native';
import type {AnimatedProps} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';


type AnimatedTextInputRef = Component<AnimatedProps<TextInputProps>>;
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function RNTextInputWithRef(props: TextInputProps, ref: ForwardedRef<React.Component<AnimatedProps<TextInputProps>>>) {

  return (
    <AnimatedTextInput
      allowFontScaling={false}
      textBreakStrategy="simple"
      keyboardAppearance="light"
      ref={(refHandle) => {
        if (typeof ref !== 'function') {
          return;
        }
        ref(refHandle);
      }}
      {...props}
    />
  );
}

RNTextInputWithRef.displayName = 'RNTextInputWithRef';

export default React.forwardRef(RNTextInputWithRef);

export type {AnimatedTextInputRef};
