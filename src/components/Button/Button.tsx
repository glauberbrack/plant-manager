import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const ButtonComponent = ({ title, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.wrapper} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.white,
  },
});

export default ButtonComponent;
