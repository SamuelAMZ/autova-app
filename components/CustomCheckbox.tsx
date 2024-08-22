import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export function CustomCheckBox({ isChecked }: { isChecked?: boolean }) {
  return (
    <View style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}>
      {isChecked && <Ionicons name="checkmark" size={20} color="white" />}
    </View>
  );
}

export default CustomCheckBox;

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#344054",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#344054",
  },
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
