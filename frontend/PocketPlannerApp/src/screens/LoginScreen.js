import React, { useState } from "react";
import { router } from "expo-router";

import api from "../services/api";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
  try {
    await api.post("/users/login", {
      email,
      password,
    });

    alert("Login Successful");
    router.push("/dashboard");

  } catch (error) {
    alert(JSON.stringify(error.response?.data || error.message));
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💰 Pocket Planner</Text>

      <Text style={styles.title}>Welcome Back</Text>

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
      

<TouchableOpacity style={styles.button} onPress={login}>
  <Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => router.push("/register")}>
  <Text
    style={{
      textAlign: "center",
      marginTop: 15,
      color: "#2563EB",
    }}
  >
    Don't have an account? Register
  </Text>
</TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
  
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
  logo: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#2563EB",
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});