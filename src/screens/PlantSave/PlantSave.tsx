import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StyleSheet, View, Text, Image, Platform, Alert } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { getBottomSpace } from "react-native-iphone-x-helper";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Button } from "../../components";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import waterDropImage from "../../assets/waterdrop.png";

import { PlantInterface, savePlant } from "../../constants/storage";

interface Params {
  plant: PlantInterface;
}

const PlantSave = () => {
  const route = useRoute();
  const { navigate } = useNavigation();
  const { plant } = route.params as Params;

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Choose an hour in the future! ⏰");
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  };

  const handleSavePlant = async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigate("Confirmation", {
        title: "Yupp!",
        subtitle: "We will remember you to take care of yours plants",
        buttonTitle: "Continue",
        icon: "topper",
        nextScreen: "MyPlants",
      });
    } catch (error) {
      Alert.alert("We can save your plant at this moment. 😭");
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />

        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipWrapper}>
          <Image source={waterDropImage} style={styles.tipImage} />

          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>Pick the best hour to be notify</Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={() => setShowDatePicker(!showDatePicker)}
          >
            <Text style={styles.dateTimePickerText}>{`Change: ${format(
              selectedDateTime,
              "HH:mm"
            )}`}</Text>
          </TouchableOpacity>
        )}

        <Button title="Save plant" onPress={handleSavePlant} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    fontFamily: fonts.text,
    textAlign: "center",
    color: colors.heading,
    fontSize: 16,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: "relative",
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 16,
    textAlign: "justify",
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 14,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});

export default PlantSave;
