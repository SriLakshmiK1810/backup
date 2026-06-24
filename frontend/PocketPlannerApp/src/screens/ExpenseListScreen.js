import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import api from "../services/api";
export default function ExpenseListScreen() {
    const [amount, setAmount] = useState("");
const [category, setCategory] = useState("");
const [title, setTitle] = useState("");

const addExpense = async () => {
  try {
    await api.post("/expenses", {
  title,
  amount: Number(amount),
  category,
  date: new Date().toISOString().split("T")[0]
});

    alert("Expense Added");

    setAmount("");
    setCategory("");
    setTitle("");

  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("RESPONSE DATA:", error.response?.data);

    alert(JSON.stringify(error.response?.data));
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expense List</Text>
        <TextInput
  placeholder="Amount"
  value={amount}
  onChangeText={setAmount}
  style={styles.input}
/>

<TextInput
  placeholder="Category"
  value={category}
  onChangeText={setCategory}
  style={styles.input}
/>

<TextInput
  placeholder="Title"
  value={title}
  onChangeText={setTitle}
  style={styles.input}
/>

<TouchableOpacity
  style={styles.button}
  onPress={addExpense}
>
  <Text style={styles.buttonText}>Add Expense</Text>
</TouchableOpacity>

      <View style={styles.card}>
        <Text>Food</Text>
        <Text>₹500</Text>
      </View>

      <View style={styles.card}>
        <Text>Travel</Text>
        <Text>₹1000</Text>
      </View>

      <View style={styles.card}>
        <Text>Shopping</Text>
        <Text>₹1500</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
});