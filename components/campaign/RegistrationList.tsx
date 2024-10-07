import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { blurhash } from "@/constants/BlurHash";
import { Image } from "expo-image";
import i18n from "@/translations";
import { useTranslation } from "react-i18next";

const RegistrationList = () => {
   
  return (
    <View style={styles.registrationList}>
      <View style={styles.imageRegistrationContainer}>
        <Image
          source={{
            uri: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/431950848_1466647250941777_8807338962286312656_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SGP71mtKArYQ7kNvgE7aEKC&_nc_ht=scontent.fhan2-3.fna&oh=00_AYBzl1h26daSGIA-hUokIdJmiSnb4yhHtiTA2doAqYr3iQ&oe=6676D2BC",
          }}
          style={[styles.iconRegistrations, styles.image1]}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
        <Image
          source={{
            uri: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/431950848_1466647250941777_8807338962286312656_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SGP71mtKArYQ7kNvgE7aEKC&_nc_ht=scontent.fhan2-3.fna&oh=00_AYBzl1h26daSGIA-hUokIdJmiSnb4yhHtiTA2doAqYr3iQ&oe=6676D2BC",
          }}
          style={[styles.iconRegistrations, styles.image2]}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
        <Image
          source={{
            uri: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/431950848_1466647250941777_8807338962286312656_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SGP71mtKArYQ7kNvgE7aEKC&_nc_ht=scontent.fhan2-3.fna&oh=00_AYBzl1h26daSGIA-hUokIdJmiSnb4yhHtiTA2doAqYr3iQ&oe=6676D2BC",
          }}
          style={[styles.iconRegistrations, styles.image3]}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
      </View>
      <Text style={styles.title}>{35} {i18n.t("campaign-signup")}</Text>
    </View>
  );
};

export default RegistrationList;

const styles = StyleSheet.create({
  registrationList: {
    flexDirection: "row",
    paddingBottom: 10
  },
  iconRegistrations: {
    width: 36,
    height: 36,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "rgb(255, 255, 255)",
  },
  image1: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  image2: {
    position: "absolute",
    top: 0,
    left: 30,
  },
  image3: {
    position: "absolute",
    top: 0,
    left: 60,
  },
  title: {
    fontFamily: "quicksand-light",
        marginTop:10

  },
  imageRegistrationContainer: {
    flex: 0.5,
    flexDirection:'row',
    maxWidth: 100
  },
});
