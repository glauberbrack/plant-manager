import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const HeaderComponent = () => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.greeting}>Hi,</Text>
        <Text style={styles.userName}>Glauber</Text>
      </View>

      <Image
        source={{ uri: "https://avatars.githubusercontent.com/u/57924169?v=4" }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default HeaderComponent;
