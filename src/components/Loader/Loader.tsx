import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import loadAnimation from "../../assets/load.json";

const LoaderComponent = () => {
  return (
    <View style={styles.wrapper}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    backgroundColor: "transparent",
    width: 200,
    height: 200,
  },
});

export default LoaderComponent;
