import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import { formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";
import { FlatList } from "react-native-gesture-handler";

import { Header, Loader, PlantCardRectangle } from "../../components";

import {
  fetchPlants,
  removePlant,
  PlantInterface,
} from "../../constants/storage";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import waterDrop from "../../assets/waterdrop.png";

const MyPlants = () => {
  const [myPlants, setMyPlants] = useState<PlantInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  const handleRemove = (plant: PlantInterface) => {
    Alert.alert("Remove", `Do you want to remove ${plant.name}?`, [
      {
        text: "Nope 🙏🏻",
        style: "cancel",
      },
      {
        text: "Yes 😥",
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Ops! Something went wrong. Try again. 😥");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    const loadStorageData = async () => {
      const plantsStoraged = await fetchPlants();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {
          locale: enUS,
        }
      );

      setNextWatered(`Water the ${plantsStoraged[0].name} in ${nextTime}`);
      setMyPlants(plantsStoraged);
      setLoading(false);
    };

    loadStorageData();
  }, []);

  if (loading) return <Loader />;

  return (
    <View style={styles.wrapper}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterDrop} style={styles.spotlightImage} />

        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Next wateredss</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardRectangle
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: "justify",
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginVertical: 20,
  },
});

export default MyPlants;
