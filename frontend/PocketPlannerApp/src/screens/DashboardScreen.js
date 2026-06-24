import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import api from "../services/api";
import { router } from "expo-router";

export default function DashboardScreen() {
    const [dashboard, setDashboard] = useState({
  totalBudget: 0,
  totalExpenses: 0,
  remainingBalance: 0,
});
 useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
  try {
    const response = await api.get("/dashboard");
    console.log(response.data);
    setDashboard(response.data);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Budget</Text>
        <Text style={styles.amount}>₹{dashboard.totalBudget}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Expenses</Text>
        <Text style={styles.amount}>₹{dashboard.totalExpenses}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Remaining Balance</Text>
        <Text style={styles.amount}>₹{dashboard.remainingBalance}</Text>
      </View>

      <TouchableOpacity
  style={styles.button}
  onPress={() => router.push("/expenses")}
>
  <Text style={styles.buttonText}>Expense List</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() => router.push("/budget")}
>
  <Text style={styles.buttonText}>Budget</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() => router.push("/profile")}
>
  <Text style={styles.buttonText}>Profile</Text>
</TouchableOpacity>
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
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    color: "#666",
  },

  amount: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});