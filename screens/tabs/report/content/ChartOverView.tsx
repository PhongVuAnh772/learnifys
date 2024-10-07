import { BarChart } from "react-native-gifted-charts";
import { View } from "react-native";
const ChartOverView = () => {
  const barData = [
    {
      value: 10,
      label: "Tháng 1",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 23,
      label: "Tháng 2",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 43,
      label: "Tháng 3",
      frontColor: "rgb(216, 1, 0)",
      labelTextStyle: {
        color: "black",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 23,
      label: "Tháng 4",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 67,
      label: "Tháng 5",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 77,
      label: "Tháng 6",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 45,
      label: "Tháng 7",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 88,
      label: "Tháng 8",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 43,
      label: "Tháng 9",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 23,
      label: "Tháng 10",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 22,
      label: "Tháng 11",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
    {
      value: 44,
      label: "Tháng 12",
      labelTextStyle: {
        color: "#838383",
        fontFamily: "quicksand-medium",
        fontSize: 10,
      },
    },
  ];
  const formatYLabel = (label: any) => {
    return `${label}M`;
  };
  return (
    <View style={{ flex: 1, paddingTop: "15%" }}>
      <BarChart
        barWidth={30}
        noOfSections={6}
        barBorderRadius={10}
        frontColor="rgb(255, 141, 140)"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={1}
        maxValue={100}
        isAnimated
        formatYLabel={formatYLabel}
        yAxisTextStyle={{
          color: "#838383",
          fontFamily: "quicksand-medium",
          fontSize: 10,
        }}
      />
    </View>
  );
};

export default ChartOverView;
