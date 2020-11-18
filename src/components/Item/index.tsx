import React from "react";

import { View, Text } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";

interface Item {
  cases: number;
  confirmed: number;
  country: string;
  deaths: number;
  recovered: number;
  updated_at: Date;
  suspects?: number;
}

const Item: React.FC<{ data: Item; state?: boolean }> = ({ data, state }) => {
  return (
    <>
      <View style={styles.item}>
        <Feather
          name="check-circle"
          style={styles.itemIcon}
          size={18}
          color="#111"
        />
        <Text style={styles.itemLabel}>
          {state ? "Casos:" : "Confirmados:"}
        </Text>
        <Text style={styles.itemText}>
          {state
            ? data.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : data.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>
      <View style={styles.item}>
        <Feather name="smile" style={styles.itemIcon} size={18} color="#111" />
        <Text style={styles.itemLabel}>Recuperados:</Text>
        <Text style={styles.itemText}>
          {data.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>
      {state && (
        <View style={styles.item}>
          <Feather name="eye" style={styles.itemIcon} size={18} color="#111" />
          <Text style={styles.itemLabel}>Suspeitos:</Text>
          <Text style={styles.itemText}>
            {data.suspects?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </View>
      )}
      <View style={styles.item}>
        <MaterialCommunityIcons
          name="skull-outline"
          style={styles.itemIcon}
          size={18}
          color="#111"
        />
        <Text style={styles.itemLabel}>Mortes:</Text>
        <Text style={styles.itemText}>
          {data.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>
      <View style={styles.item}>
        <Feather name="clock" style={styles.itemIcon} size={18} color="#111" />
        <Text style={styles.itemLabel}>Atualizado:</Text>
        <Text style={styles.itemText}>{`${String(
          "0" + data.updated_at.getDay()
        ).slice(-2)}/${String("0" + (data.updated_at.getMonth() + 1)).slice(
          -2
        )}/${data.updated_at.getFullYear()} - ${String(
          "0" + data.updated_at.getHours()
        ).slice(-2)}: ${String("0" + data.updated_at.getMinutes()).slice(
          -2
        )}`}</Text>
      </View>
    </>
  );
};

export default Item;
