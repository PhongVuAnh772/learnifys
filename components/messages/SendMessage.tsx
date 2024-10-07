import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SMSMessage from './SMSMessage';
import FaceboookMessage from './FacebookMessage';
import SystemMessage from './SystemMessage';
import ZaloFollowMessage from './ZaloFollowMessage';
import ZaloZNSMessage from './ZaloZNSMessage';
interface SendMessageProps {
  category: string;
}

const categoryContent: { [key: string]: React.ReactNode } = {
  'sms': <SMSMessage fee={700} />,
  'zalo-follow': <ZaloFollowMessage fee={500}/>,
  'zalo-zns': <ZaloZNSMessage fee={500}/>,
  'system': <SystemMessage />,
    'facebook': <FaceboookMessage />,

};

const SendMessage = ({ category }: SendMessageProps) => {
  return (
    <View style={styles.container}>
      {categoryContent[category]}
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
    borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 16

  },
});
