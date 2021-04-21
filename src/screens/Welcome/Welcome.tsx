import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";

import waterImg from "../../assets/watering.png";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const Welcome = () => {
  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>Take care {"\n"} of your plants</Text>
      <Image source={waterImg} style={styles.image} resizeMode={"contain"} />

      <Text style={styles.subtitle}>
        Don't forget to water your plants. We take care to remind you whenever
        you need!
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigate("UserIdentification")}
      >
        <Feather name="chevron-right" style={styles.buttonIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  image: {
    width: 292,
    height: Dimensions.get("window").width * 0.7,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 28,
  },
});

export default Welcome;
