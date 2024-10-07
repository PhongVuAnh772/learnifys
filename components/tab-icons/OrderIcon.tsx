import React from "react";
import { Svg, Path } from "react-native-svg";

interface Props {
  size: number;
  color: string;
  focused: boolean;
}

const OrderIcon = ({ size, color, focused }: Props) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
    >
      <Path
        d="M20.6001 7L12.6001 11L4.6001 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.2246 4.66762L14.2247 2.35827C13.1904 1.88058 12.0098 1.88058 10.9755 2.35827L5.97554 4.66762C4.53103 5.33479 3.6001 6.82344 3.6001 8.46617V15.5338C3.6001 17.1766 4.53103 18.6652 5.97555 19.3324L10.9755 21.6417C12.0098 22.1194 13.1904 22.1194 14.2247 21.6417L19.2247 19.3324C20.6692 18.6652 21.6001 17.1766 21.6001 15.5338V8.46617C21.6001 6.82344 20.6692 5.33479 19.2246 4.66762Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.6001 11V22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default OrderIcon;
