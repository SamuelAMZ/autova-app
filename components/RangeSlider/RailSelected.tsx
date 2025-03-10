import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import colors from "@/constants/Colors";

const RailSelected = () => {
  return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 12,
    backgroundColor: colors.background,
    borderRadius: 2,
  },
});
