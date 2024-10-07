import type {ForwardedRef} from 'react';
import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import type {TextProps as RNTextProps, TextStyle} from 'react-native';
import {useTheme} from "@/theme";
import ChildrenProps from "@/types/utils/ChildrenProps.ts";
import FontUtils, {FontUtilsType} from "@/styles/utils/FontUtils";

type TextProps = RNTextProps &
  ChildrenProps & {
  color?: string;
  fontSize?: number;
  textAlign?: TextStyle['textAlign'];
  children: React.ReactNode;
  fontFamily?: keyof FontUtilsType['fontFamily']["single"];
};

function Typography({
                      color,
                      textAlign = 'left',
                      children,
                      fontFamily = 'INTER_REGULAR',
                      style = {},
                      ...props
                    }: TextProps, ref: ForwardedRef<RNText>) {
  const {colors} = useTheme();

  const componentStyle: TextStyle = {
    color: color ?? colors.text,
    textAlign,
    fontFamily: FontUtils.fontFamily.single[fontFamily],
    ...StyleSheet.flatten(style),
  };

  return (
    <RNText
      allowFontScaling={false}
      ref={ref}
      style={componentStyle}
      {...props}
    >
      {children}
    </RNText>
  );
}

Typography.displayName = 'Typography';

export default React.forwardRef(Typography);
export type {TextProps};
