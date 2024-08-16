import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

const Thumb = ({ name }: { name: string }) => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: "#5856D6",
    borderWidth: 3,
    borderColor: "white",
  },
});

export default memo(Thumb);
