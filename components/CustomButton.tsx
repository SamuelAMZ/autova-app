import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import ThemedText from "./ThemedText";
import colors from "@/constants/Colors";

type CustomButtonProps = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
};

const CustomButton = ({
  title,
  onPress,
  backgroundColor = colors.background,
  textColor = "#fff",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <ThemedText
        style={[styles.buttonText, { color: textColor, fontWeight: 500 }]}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 17,
  },
});

export default CustomButton;
