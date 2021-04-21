import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Button } from "../../components";

const Confirmation = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🥳</Text>
        <Text style={styles.title}>All set!</Text>
        <Text style={styles.subtitle}>
          Let's start to take care of your plants
        </Text>
        <Button title="Start!" onPress={() => navigate("PlantSelect")} />
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
