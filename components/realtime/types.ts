import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PropsWithChildren } from "react";
import { MediaStream } from "react-native-webrtc";

export type Props = NativeStackScreenProps<any> & PropsWithChildren;

export enum Screen {
  CreateRoom,
  InRoomCall,
}

export type RemoteSteam = {
  track: MediaStream;
  mic: boolean;
  camera: boolean;
  id: string;
};

export type MediaControl = {
  mic: boolean;
  camera: boolean;
  speaker?: boolean;
};
