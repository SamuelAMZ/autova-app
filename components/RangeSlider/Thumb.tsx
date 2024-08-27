import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import colors from "@/constants/Colors";

const Thumb = ({ name }: { name: string }) => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: 28,
    height: 28,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 3,
    borderColor: "white",
  },
});

export default memo(Thumb);
