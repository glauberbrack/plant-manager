import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

import {
  Header,
  EnvironmentButton,
  PlantCardSquare,
  Loader,
} from "../../components";
import api from "../../services/api";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { PlantInterface } from "../../constants/storage";

interface EnvironmentProps {
  key: string;
  title: string;
}

const PlantSelect = () => {
  const { navigate } = useNavigation();

  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantInterface[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantInterface[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment);

    if (environment === "all") return setFilteredPlants(plants);

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  };

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  const handleFetchMore = (distance: number) => {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  };

  const handlePlantSelect = (plant: PlantInterface) => {
    navigate("PlantSave", { plant });
  };

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );
      setEnvironments([
        {
          key: "all",
          title: "All",
        },
        ...data,
      ]);
    }

    fetchEnvironments();
    fetchPlants();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.wrapper}>
      <View style={{ padding: 30 }}>
        <Header />

        <Text style={styles.title}>Where do you want</Text>
        <Text style={styles.subtitle}>to place your plant?</Text>
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
          data={environments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
        />
      </View>
      <View style={styles.plantsWrapper}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <PlantCardSquare
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 35,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: fonts.text,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    marginTop: 15,
    marginLeft: 30,
    justifyContent: "center",
  },
  plantsWrapper: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
});

export default PlantSelect;
