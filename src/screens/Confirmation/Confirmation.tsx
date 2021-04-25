import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Button } from "../../components";

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: "happy" | "topper";
  nextScreen: string;
}

const emojis = {
  happy: "🥳",
  topper: "😎",
};

const Confirmation = () => {
  const { navigate } = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Params;

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Button title={buttonTitle} onPress={() => navigate(nextScreen)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 55,
    width: "100%",
  },
  emoji: {
    fontSize: 32,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 22,
    textAlign: "center",
    lineHeight: 38,
    marginTop: 15,
    color: colors.heading,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 17,
    paddingHorizontal: 20,
    color: colors.heading,
    marginBottom: 40,
  },
});

export default Confirmation;
