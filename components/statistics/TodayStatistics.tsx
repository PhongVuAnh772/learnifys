import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageBackground } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import classIcon from "@/assets/card/retail-order.png";
import examIcon from "@/assets/card/agency-order.png";
import documentIcon from "@/assets/card/new-customer.png";
import missionIcon from "@/assets/card/revenue.png";

const TodayStatistics = ({ stats }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleMain}>Tổng quan hôm nay</Text>
      <View style={styles.statisticContainer}>
        <ImageBackground
          source={classIcon}
          style={styles.image}
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        >
          <Text style={styles.title}>Lớp tham gia</Text>
          <Text style={styles.number}>{stats?.classes ?? 0}</Text>
        </ImageBackground>

        <ImageBackground
          source={examIcon}
          style={styles.image}
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        >
          <Text style={styles.title}>Bài kiểm tra</Text>
          <Text style={styles.number}>{stats?.exams ?? 0}</Text>
        </ImageBackground>
      </View>

      <View style={[styles.statisticContainer, { paddingTop: 15 }]}>
        <ImageBackground
          source={documentIcon}
          style={styles.image}
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        >
          <Text style={[styles.title, { color: "black" }]}>Tài liệu</Text>
          <Text style={[styles.number, { color: "black" }]}>
            {stats?.documents ?? 0}
          </Text>
        </ImageBackground>

        <ImageBackground
          source={missionIcon}
          style={styles.image}
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        >
          <Text style={[styles.title, { color: "black" }]}>
            Nhiệm vụ hôm nay
          </Text>
          <Text style={[styles.number, { color: "black" }]}>
            {stats?.missions ?? 0}
          </Text>
        </ImageBackground>
      </View>
    </View>
  );
};

export default TodayStatistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  image: {
    width: "48%",
    height: 100,
    padding: 16,
    gap: 12,
  },
  statisticContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 15,
  },
  title: {
    fontFamily: "quicksand-bold",
    fontSize: 15,
    color: "white",
  },
  number: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "quicksand-bold",
    color: "white",
  },
  titleMain: {
    fontWeight: "700",
    fontFamily: "quicksand-bold",
    fontSize: 18,
  },
});
