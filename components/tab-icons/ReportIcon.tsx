import React from "react";
import { Svg, Path } from "react-native-svg";

interface Props {
  size: number;
  color: string;
  focused: boolean;
}

const ReportIcon = ({ size, color, focused }: Props) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 21 22"
      fill="none"
    >
      <Path
        d="M6.40015 9H14.4001M6.40015 13H14.4001M6.40015 17H10.4001M6.40015 3C6.40015 4.10457 7.29558 5 8.40015 5H12.4001C13.5047 5 14.4001 4.10457 14.4001 3M6.40015 3C6.40015 1.89543 7.29558 1 8.40015 1H12.4001C13.5047 1 14.4001 1.89543 14.4001 3M6.40015 3H5.40015C3.19101 3 1.40015 4.79086 1.40015 7V17C1.40015 19.2091 3.19101 21 5.40015 21H15.4001C17.6093 21 19.4001 19.2091 19.4001 17V7C19.4001 4.79086 17.6093 3 15.4001 3H14.4001"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default ReportIcon;
