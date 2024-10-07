import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  CreatingPIN: undefined; 
  ReEnteringPIN: {code: string}
  CommonAuth: undefined;
  RegisterAuth: undefined;
  PinAuth: undefined;
  VerifiedAuth: undefined;
  AddressOverview: undefined;
  AddingAddress: undefined;
  Profile: undefined;
};

export type CreatingPINScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreatingPIN'>;
export type ReEnteringPINScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreatingPIN'>;


export type Props = {
  navigation: CreatingPINScreenNavigationProp;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
