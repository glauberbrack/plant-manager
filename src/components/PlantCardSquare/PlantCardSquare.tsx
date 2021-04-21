import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

const PlantCardSquareComponent = ({ data, ...rest }: PlantProps) => {
  return (
    <RectButton style={styles.wrapper} {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    margin: 10,
    alignItems: "center",
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.text,
    marginVertical: 16,
  },
});

export default PlantCardSquareComponent;
