import React, { useEffect, useState } from "react";

import { apiCovid, apiUf } from "../../services/api";
import Shimmer from "react-native-shimmer-placeholder";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Animated,
  Alert,
} from "react-native";

import Mask from "../../assets/mask.svg";

/* Components */
import Item from "../../components/Item";

import styles from "./styles";

interface Data {
  cases: number;
  confirmed: number;
  country: string;
  deaths: number;
  recovered: number;
  updated_at: Date;
}

interface StateData {
  uf: string;
  uid: number;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string;
}

interface SearchOptions {
  uf: string;
  name: string;
}

interface UfData {
  nome: string;
  sigla: string;
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchOptions, setSearchOptions] = useState<SearchOptions[]>([]);
  const [searchAutocomplete, setSearchAutocomplete] = useState<SearchOptions[]>(
    []
  );

  const [data, setData] = useState<Data[]>([]);
  const [stateData, setStateData] = useState<StateData | null>(null);

  useEffect(() => {
    handleGetStates();
    handleGetDataCountry();
  }, []);

  useEffect(() => {
    if (search.length > 1) {
      setSearchAutocomplete(SearchAutocomplete());
    }
  }, [search]);

  async function handleGetStates() {
    const { data }: { data: UfData[] } = await apiUf.get("estados");

    const newData: SearchOptions[] = [];

    data.forEach((state) =>
      newData.push({ name: state.nome, uf: state.sigla })
    );

    setSearchOptions(newData);
  }

  async function handleGetDataCountry() {
    setLoading(true);

    const countries = ["brazil", "us", "china", "italy"];

    const newData = [];

    for (const country of countries) {
      const { data: responseData } = await apiCovid.get(country);

      newData.push({
        ...responseData.data,
        updated_at: new Date(responseData.data.updated_at),
      });
    }

    setData(newData);
    setLoading(false);
  }

  async function handleSearchByState(value?: string, uf?: string) {
    if (value) setSearch(value);

    setLoading(true);
    if (search.length < 1 && !value) return;

    if (!uf && searchOptions.length <= 0) {
      Alert.alert(
        "Error",
        "Error ao buscar informações sobre um estado. Tente novamente.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      handleGetDataCountry();
      return;
    }

    let states: SearchOptions[] = [];
    if (!uf) {
      states = searchOptions.filter(
        (element) => element.name.toLowerCase() === search.toLowerCase()
      );
    }

    if (!uf && states.length <= 0) {
      Alert.alert(
        "Estado invalido!",
        "O estado que você digitou não existe. Tente novamente.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      handleGetDataCountry();
      return;
    }

    const { data } = await apiCovid.get(
      `brazil/uf/${uf ? uf.toLowerCase() : states[0].uf.toLowerCase()}`
    );

    setStateData(data);
    setLoading(false);
  }

  function SearchAutocomplete() {
    return searchOptions.filter((element) => {
      const regex = new RegExp(search, "gi");
      return element.name.match(regex) || element.uf.match(regex);
    });
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.searchContainer}>
          <TextInput
            value={search}
            style={styles.searchInput}
            placeholder="Buscar por estados brasileiros"
            placeholderTextColor="#808080"
            keyboardType="web-search"
            returnKeyType="search"
            onBlur={() => setSearchFocus(false)}
            onFocus={() => setSearchFocus(true)}
            onChangeText={(value) => setSearch(value)}
            onSubmitEditing={() => handleSearchByState()}
          />
          <RectButton
            style={styles.searchButton}
            onPress={() => handleSearchByState()}
          >
            <Feather name="search" color="#808080" size={20} />
          </RectButton>
        </View>

        {searchFocus && (
          <ScrollView
            style={styles.searchUfsContainer}
            showsVerticalScrollIndicator={false}
          >
            {searchAutocomplete.map((value, index) => (
              <TouchableOpacity
                key={index}
                style={styles.searchUfsItem}
                onPress={() => {
                  handleSearchByState(value.name, value.uf);
                }}
              >
                <Text
                  style={styles.searchUfsItemText}
                >{`${value.uf.toUpperCase()} - ${value.name}`}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <>
            <Shimmer
              style={styles.itemShimmer}
              width={300}
              shimmerColors={["#ededed", "rgba(215, 215, 215, .8)", "#ededed"]}
            />
            <Shimmer
              style={[styles.itemShimmer, { marginTop: 24 }]}
              width={300}
              shimmerColors={["#ededed", "rgba(215, 215, 215, .8)", "#ededed"]}
            />
          </>
        )}

        {!loading && !stateData
          ? data.map((value, index) => (
              <View key={index}>
                {index !== 0 && <View style={styles.regionSeparator} />}

                {value.country.toLowerCase() === "brazil" && (
                  <Text style={styles.title}>Brasil:</Text>
                )}
                {value.country.toLowerCase() === "us" && (
                  <Text style={styles.title}>Estados Unidos:</Text>
                )}

                {value.country.toLowerCase() === "china" && (
                  <Text style={styles.title}>China:</Text>
                )}
                {value.country.toLowerCase() === "italy" && (
                  <Text style={styles.title}>Itália:</Text>
                )}

                <Item data={value} />
              </View>
            ))
          : null}
        {!loading && stateData ? (
          <View>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { marginBottom: 0 }]}>
                {stateData.state}
              </Text>
              <TouchableOpacity
                style={styles.back}
                onPress={() => {
                  setStateData(null);
                  handleGetDataCountry();
                }}
              >
                <Feather name="arrow-left" size={18} color="#111" />
                <Text style={styles.backTest}>Voltar</Text>
              </TouchableOpacity>
            </View>

            <Item
              data={{
                ...stateData,
                country: "",
                recovered: stateData.refuses,
                confirmed: 0,
                updated_at: new Date(stateData.datetime),
              }}
              state
            />
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.infoContainer}>
        <Mask height={32} width={32} />
        <Text style={styles.infoText}>Não se esqueça de usar mascara.</Text>
      </View>
    </View>
  );
};

export default Home;
