import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BudgetCard({
  title,
  value,
}) {
  return (
    <View style={styles.card}>
      <Text>{title}</Text>
      <Text>₹{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
});