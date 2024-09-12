import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import ThemedText from "./ThemedText";
import Colors from "@/constants/Colors";
import { isLoading } from "expo-font";

type CustomButtonProps = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
};

const CustomButton = ({
  title,
  onPress,
  backgroundColor = Colors.background,
  textColor = Colors.textPrimary,
  isLoading,
  disabled,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={
        !disabled
          ? [styles.button, { backgroundColor }]
          : [styles.button, { backgroundColor: "#98A2B3" }]
      }
      onPress={onPress}
      disabled={disabled}>
      {isLoading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        <ThemedText
          style={[styles.buttonText, { color: textColor, fontWeight: 500 }]}>
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 17,
  },
});

export default CustomButton;
