import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BudgetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Budget</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Monthly Budget</Text>
        <Text style={styles.amount}>₹20,000</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  amount: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
});