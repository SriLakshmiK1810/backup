import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({
  title,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },

  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});