import React, {memo} from 'react';
import {StyleSheet, TouchableHighlight, TouchableHighlightProps, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Badge} from 'react-native-paper';
import Colors from '@/constants/Colors';
export interface IconButtonProps extends TouchableHighlightProps {
  icon: IconProp;
  size?: number;
  iconColor?: string;
  underlayVisible?: boolean;
  badge?: number | string;
}

const IconButton = memo(({
  icon,
  size = 16,
  iconColor,
  underlayVisible,
  badge,
  ...props
}: IconButtonProps) => {
  const styles = useStyles();

  return (
    <TouchableHighlight
      underlayColor={Colors.dark}
      {...props}
      style={[styles.outer,
        StyleSheet.flatten(props.style),
      ]}>
      <>
        <FontAwesomeIcon
          icon={icon}
          style={{
            color: iconColor || Colors.dark,
          }}
          size={size}
        />
        {(badge !== undefined) && (
          <View style={styles.badgeIcon}>
            <Badge>{badge}</Badge>
          </View>
        )}
      </>
    </TouchableHighlight>
  );
});

const useStyles = () => {
  return StyleSheet.create({
    outer: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 99,
      padding: 8,
    },
    badgeIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
      borderWidth: 2,
      borderColor: Colors.dark,
      borderRadius: 99
    },
  });
};

export default IconButton;
