import React, { ReactElement, useMemo, useEffect } from 'react';
import { StatusBar, StyleSheet, View, ViewProps, Text,Platform } from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconButton from './IconButton';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

type HeaderButton = {
  icon: IconProp;
  color?: string;
  onPress?: () => void;
  badge?: number | string;
};

interface ScreenHeaderProps extends ViewProps {
  title: string;
  canGoBack?: boolean;
  leftIcons?: HeaderButton[];
  left?: ReactElement;
  rightIcons?: HeaderButton[];
  right?: ReactElement;
  colorTitle?: string;
}

const ScreenHeader = ({
  children,
  title,
  canGoBack = false,
  leftIcons,
  left,
  rightIcons,
  right,
  colorTitle = 'black',
  ...props
}: ScreenHeaderProps) => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const styles = useStyles();
  const leftButtons = useMemo(() => [
    ...(canGoBack ? [{
      icon: faArrowLeft,
      onPress: () => {
        router?.canGoBack() && router.back();
      },
    }] : []),
    ...(leftIcons ? leftIcons : [])
  ], [canGoBack, leftIcons]);

  const rightButtons = useMemo(() => [...(rightIcons ? rightIcons : [])], [rightIcons]);

  const hasButton = useMemo(() => leftButtons.length || rightButtons.length, [leftButtons, rightButtons]);

  return (
    <View {...props} style={[{
      paddingTop: ( Platform.OS === 'ios' ? 16 : top) + (hasButton ? 0 : 12),
      paddingBottom: (hasButton && !children) ? 0 : 12,
    }, StyleSheet.flatten(props.style)]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.outer}>
        <View style={styles.side}>
          {leftButtons.map((item, index) => (
            <IconButton
              key={index.toString()}
              icon={item.icon}
              iconColor={item.color}
              onPress={item.onPress}
              badge={item.badge}
              style={[styles.backButton, { marginLeft: index ? -12 : 0,backgroundColor:"white" }]}
            />
          ))}
          {left}
        </View>
        <Text style={[styles.title, {color: colorTitle}]}>{title}</Text>
        <View style={[styles.side, { justifyContent: 'flex-end' }]}>
          {right}
          {rightButtons.map((item, index) => (
            <IconButton
              key={index.toString()}
              icon={item.icon}
              iconColor={item.color || Colors.primary}
              onPress={item.onPress}
              badge={item.badge}
              style={[styles.backButton, { marginRight: (!index && rightButtons.length > 1) ? -12 : 0 }]}
            />
          ))}
        </View>
      </View>
      {children}
    </View>
  );
};

const useStyles = () => StyleSheet.create({
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  side: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 14,
  },
  rightButton: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: "quicksand-bold",
  },
});

export default ScreenHeader;
