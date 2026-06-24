import React, { useState } from "react";
import api from "../services/api";
import { router } from "expo-router";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function RegisterScreen() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
  console.log("Register clicked");

  try {
    const response = await api.post("/users/register", {
      name,
      email,
      password
    });

    console.log("Success:", response.data);
    alert("Registration Successful");
    router.push("/login");

  } catch (error) {
    console.log("Error:", error);
    alert("Registration Failed");
  }
};


  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Create Account
      </Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
  style={styles.registerButton}
  onPress={register}
>
  <Text style={styles.buttonText}>Register</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => router.push("/login")}>
  <Text
    style={{
      textAlign: "center",
      marginTop: 15,
      color: "#2563EB",
    }}
  >
    Already have an account? Login
  </Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#2563EB",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  registerButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});