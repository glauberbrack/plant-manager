import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

const EnvironmentButtonComponent = ({
  title,
  active = false,
  ...rest
}: EnvironmentButtonProps) => {
  return (
    <RectButton
      style={[styles.wrapper, active && styles.activeWrapper]}
      {...rest}
    >
      <Text style={[styles.text, active && styles.activeText]}>{title}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.shape,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 7,
  },
  activeWrapper: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  activeText: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});

export default EnvironmentButtonComponent;
